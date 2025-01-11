'use server'

import { redirect } from "next/navigation"
import { authService } from "./authService"
import { ACCESS_SCOPES } from "../config"

export const signIn = async () => {
	const auth = await authService()
	auth.process.state = Math.random().toString()

	const url = new URL('https://accounts.spotify.com/authorize')
	url.search = new URLSearchParams({
		response_type: 'code',
		client_id: process.env.SPOTIFY_CLIENT_ID,
		scope: ACCESS_SCOPES,
		redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
		state: auth.process.state
	}).toString()

	redirect(url.toString())
}
