import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { authService, checkAuth } from './entities/user'
import { spotifyApi } from './shared/api/spotify-client'

export async function middleware(request: NextRequest) {
  const isUserAuthorized = await checkAuth()

  if(isUserAuthorized) {
	const user = await spotifyApi.getCurrentUsersProfile.fetch()
	if(request.url.includes(`/user/${user.id}`)) {
		return NextResponse.redirect('http://localhost:3000/dashboard/me')
	}
    NextResponse.next()
  }
  else {
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
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt|auth|icons).*)',
	],
}

