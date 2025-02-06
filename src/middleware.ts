import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { authService, checkAuth } from './entities/user'

export async function middleware(request: NextRequest) {
  function isPrivateRoute() {
    const segments = new URL(request.url).pathname.split('dashboard')
    return Boolean(segments[segments.length - 1])
  }

  const isUserAuthorized = await checkAuth()

  if(isPrivateRoute()) {
    if(isUserAuthorized) {
      NextResponse.next()
    }
    else {
      return NextResponse.redirect('http://localhost:3000/dashboard')
    }
  }
  else {
    NextResponse.next()
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/dashboard/:path*'],
}