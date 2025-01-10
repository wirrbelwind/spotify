'use server'

import { spotifyApi } from "@/shared/api"
import { redirect } from "next/navigation"
import { authService } from "./authService"

export const handleAuthCallback = async (request: Request) => {
	const auth = await authService()
	const params = new URL(request.url).searchParams

	const stateFromParams = params.get('state')

	if (!stateFromParams) {
		throw new Error('parameter code is null')
	}

	if (auth.process.state !== stateFromParams) {
		throw new Error('states are not the same')
	}

	const errorParam = params.get('error')

	if (errorParam) {
		throw new Error(errorParam)
	}

	const codeParam = params.get('code')

	if (!codeParam) {
		throw new Error('code param is null')
	}

	const authHeader = btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)

	try {
		const tokensResponse = await spotifyApi.post('https://accounts.spotify.com/api/token', {
			grant_type: 'authorization_code',
			code: codeParam,
			redirect_uri: process.env.SPOTIFY_REDIRECT_URI
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${authHeader}`
			},
		})

		const tokens = tokensResponse.data as {
			access_token: string
			token_type: string
			scope: string
			expires_in: number
			refresh_token: string
		}

		auth.tokens.accessTokenExpiresAt = Date.now() + tokens.expires_in * 1000
		auth.tokens.accessToken = tokens.access_token
		auth.tokens.refreshToken = tokens.refresh_token
	}
	catch (error) {
		throw error
	}


	if (auth.process.targetPageAfterLogin) {
		redirect(auth.process.targetPageAfterLogin)
		auth.process.targetPageAfterLogin = null
	}
	else {
		redirect('/')
	}
}