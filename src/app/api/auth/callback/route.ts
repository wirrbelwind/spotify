import { cookies } from "next/headers"
import { $axios } from "../../../../utils/$axios"
import { redirect } from 'next/navigation'
import { COOKIE_KEYS } from "@/constants"

//TODO: handle callback from spotify auth
export const GET = async (request: Request) => {
	const cookie = await cookies()
	const params = new URL(request.url).searchParams

	const stateFromParams = params.get('state')
	const clientSavedState = cookie.get(COOKIE_KEYS.STATE)?.value

	if (!stateFromParams) {
		throw new Error('parameter code is null')
	}

	if (clientSavedState !== stateFromParams) {
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
		const tokensResponse = await $axios.post('https://accounts.spotify.com/api/token', {
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

		const accessTokenExpiresAt = Date.now() + tokens.expires_in * 1000

		cookie.set(COOKIE_KEYS.ACCESS_TOKEN, tokens.access_token)
		cookie.set(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT, accessTokenExpiresAt.toString())
		cookie.set(COOKIE_KEYS.REFRESH_TOKEN, tokens.refresh_token)
	}
	catch (error) {
		throw error
	}

	const targetUrlAfterAuth = cookie.get(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)?.value

	if (targetUrlAfterAuth) {
		cookie.delete(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)
		redirect(targetUrlAfterAuth)
	}
	else {
		redirect('/')
	}
}
