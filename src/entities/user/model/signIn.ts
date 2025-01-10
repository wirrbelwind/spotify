'use server'

import { redirect } from "next/navigation"
import { authService } from "./authService"

export const signIn = async () => {
	const auth = await authService()
	auth.process.state = Math.random().toString()

	const scopeList = `ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`

	redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scopeList}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${auth.process.state}`)
}
