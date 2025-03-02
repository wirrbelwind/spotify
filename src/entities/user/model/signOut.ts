'use server'

import { authenticationActions } from './authentication'

export async function signOut() {
  authenticationActions.setAccessToken('')
  authenticationActions.setAccessTokenExpiration('')
  authenticationActions.setRefreshToken('')
}
