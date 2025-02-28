import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { spotifyApi } from './shared/api/spotify-client'
import { routeUrl } from './shared/lib/route-url'
import { authenticationActions } from './entities/user'

export async function middleware(request: NextRequest) {
	try {
		
		const authTokensValid = await authenticationActions.checkTokens()

		if(authTokensValid) {
		  const user = await spotifyApi.getCurrentUsersProfile.fetch()
		  if(request.url.includes(`/user/${user.id}`)) {
			  return NextResponse.redirect(
				  routeUrl.profile()
			  )
		  }
		  NextResponse.next()
		}
		else {
		  return NextResponse.redirect(
			  routeUrl.auth()
		  )
		}
	}
	catch(error) {
		console.log(error)
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
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt|auth|icons).*)',
	],
}

