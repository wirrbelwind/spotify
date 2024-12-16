import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const GET = async (request: Request) => {
	const authState = Math.random().toString()
	const cookie = await cookies()
	cookie.set('spotify-api:state', authState)

	redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=user-read-private user-read-email&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${authState}`)
}
