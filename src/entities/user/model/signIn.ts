'use server'

import { redirect } from 'next/navigation'
import { ACCESS_SCOPES } from '../config'
import { authenticationActions } from './authentication'

export async function signIn() {
  const authenticationState = Math.random().toString()

  await authenticationActions.setAuthenticationState(authenticationState)

  const url = new URL('https://accounts.spotify.com/authorize')
  url.search = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: ACCESS_SCOPES,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: authenticationState,
  }).toString()

  redirect(url.toString())
}
