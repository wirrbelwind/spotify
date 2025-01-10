'use server'

import { authService } from "./authService"

export const signOut = async () => {
	const auth = await authService()

	auth.tokens.accessToken = null
	auth.tokens.accessTokenExpiresAt = null

	auth.tokens.refreshToken = null
}