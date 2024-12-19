import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { getUser } from './entities/user/getUser'
import { authService } from './entities/user/authService'

export async function middleware(request: NextRequest) {
	try {
		await getUser()
		return NextResponse.next()
	}
	catch (error) {
		const auth = await authService()
		auth.process.targetPageAfterLogin = request.url

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
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt|auth).*)',
	],
}
