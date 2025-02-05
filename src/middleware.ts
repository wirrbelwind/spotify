import { NextResponse } from 'next/server'
import type { MiddlewareConfig, NextRequest } from 'next/server'
import { authService, checkAuth } from './entities/user'

export async function middleware(request: NextRequest) {
  const isUserAuthorized = await checkAuth()

  if(isUserAuthorized) {
    NextResponse.next()
  }
  else {
    return NextResponse.redirect('http://localhost:3000/dashboard')
  }
}

export const config: MiddlewareConfig = {
  matcher: ['/dashboard/:path*'],
}