'use server'

import { redirect } from 'next/navigation'
import { authService } from './authService'
import { spotifyApi } from '@/shared/api/spotify-client'
import { authenticationActions } from './authentication'

export async function handleAuthCallback(request: Request) {
  const params = new URL(request.url).searchParams

  const stateFromParams = params.get('state')

  if (!stateFromParams) {
    throw new Error('parameter code is null')
  }

  if ((await authenticationActions.getAuthenticationState()) !== stateFromParams) {
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

  const base64Credentials = btoa(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  )

  try {
    const tokensResponse = await spotifyApi.auth.getTokensByCode.fetch({
      code: codeParam,
      base64Credentials,
    })

    authenticationActions.setAccessTokenExpiration(Date.now() + tokensResponse.expires_in * 1000)
    authenticationActions.setAccessToken(tokensResponse.access_token)
    authenticationActions.setRefreshToken(tokensResponse.refresh_token)
  } catch (error) {
    throw error
  }

  const pageToRedirect = await authenticationActions.getAttemptedPage()
  if (pageToRedirect) {
    redirect(pageToRedirect)
  } else {
    redirect('/')
  }
}
