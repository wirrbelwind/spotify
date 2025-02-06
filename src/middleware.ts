import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { authService, checkAuth } from './entities/user'

// export async function middleware(request: NextRequest) {
//   function isPrivateRoute() {
//     const segments = new URL(request.url).pathname.split('dashboard')
//     return Boolean(segments[segments.length - 1])
//   }

//   const isUserAuthorized = await checkAuth()

//   if(isPrivateRoute()) {
//     if(isUserAuthorized) {
//       NextResponse.next()
//     }
//     else {
//       return NextResponse.redirect('http://localhost:3000/dashboard')
//     }
//   }
//   else {
//     NextResponse.next()
//   }
// }

// export const config: MiddlewareConfig = {
//   matcher: ['/dashboard/:path*'],
// }

export async function middleware(request: NextRequest) {
	// const user = await getCurrentUser()

	// if (user) {
	// 	NextResponse.next()
	// }
	// else {
	// 	const auth = await authService()
	// 	auth.process.targetPageAfterLogin = request.url

	// 	return NextResponse.redirect('http://localhost:3000/auth')
	// }
  const isUserAuthorized = await checkAuth()

  if(isUserAuthorized) {
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