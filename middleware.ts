import axios from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'

const $axios = axios.create()

const refreshTokens = async (refreshToken: string) => {
	const cookie = await cookies()

	const refreshTokenResponse = await $axios.post('https://accounts.spotify.com/api/token', {
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: process.env.SPOTIFY_CLIENT_ID
	}, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			// 'Authorization': 'Basic <base64 encoded client_id:client_secret>',
			'Authorization': `Basic ${window.btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
		},
	})

	if (refreshTokenResponse.status >= 400) {
		// return error
		throw new Error('refresh token error', {
			cause: refreshTokenResponse.data
		})
		// {
		// 	error_description: string
		// 	error: string
		// }
	}

	const tokens = refreshTokenResponse.data as {
		access_token: string
		token_type: string
		expires_in: number
		refresh_token: string
		scope: string
	}

	cookie.set('spotify-api:access-token', tokens.access_token)
	cookie.set('spotify-api:access-token-expires-at', tokens.expires_in.toString())
	cookie.set('spotify-api:refresh-token', tokens.refresh_token)

	return tokens
}
$axios.interceptors.request.use(async config => {
	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('no tokens')
	}

	const now = Date.now()

	if (accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	return config
})

$axios.interceptors.response.use(async response => {
	if (response.status === 200) {
		return response
	}

	const request = response.request

	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('no tokens')
	}

	const now = Date.now()

	if (accessTokenExpiresAt <= now) {
		const tokens = await refreshTokens(refreshToken)

		if (tokens.error) {
			throw new Error('cant refresh tokens')
		}
	}

	return response
})

export const getUser = async () => {
	const cookie = await cookies()

	let accessToken = cookie.get('spotify-api:access-token')?.value
	let refreshToken = cookie.get('spotify-api:refresh-token')?.value

	let accessTokenExpiresAt = Number(cookie.get('spotify-api:access-token-expires-at')?.value)

	if (!accessToken || !refreshToken || !accessTokenExpiresAt || isNaN(accessTokenExpiresAt)) {
		throw new Error('tokens are not in cookie')
	}

	const now = Date.now()

	if (now >= accessTokenExpiresAt) {
		// try to predict deprecated access token
		// refresh tokens
		await refreshTokens(refreshToken)
	}

	//request user profile
	const userResponse = await $axios.get('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${cookie.get('spotify-api:access-token')?.value}`
		}
	})

	return userResponse.data as {
		name: string
		id: number
	}
	//allow axios to handle the rest of logic
	//if axios got error 401 about deprecated access token, then interceptor refreshes token and repeats request
	// if error again or another error code then redirect user
	//redirect should be on middleware.ts level and on interceptor level
	//remember the url user tried to open and open it after auth
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	try {
		await getUser()
		return NextResponse.next()
	}
	catch (error) {
		return NextResponse.redirect('http://localhost:3000/auth')
	}
}

export const config: MiddlewareConfig = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
	],
}
