'use server'

import { authenticationActions } from "./authentication"
import { authService } from "./authService"

export const signOut = async () => {
	authenticationActions.setAccessToken('')
	authenticationActions.setAccessTokenExpiration('')
	authenticationActions.setRefreshToken('')
}
