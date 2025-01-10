'use server'
import UserEntity from ".."

export const signOut = async () => {
	const authService = await UserEntity.authService()

	authService.tokens.accessToken = null
	authService.tokens.accessTokenExpiresAt = null

	authService.tokens.refreshToken = null
}