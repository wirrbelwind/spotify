import UserEntity from "@/entities/user"
import { handleAuthCallback } from "@/entities/user/model/handleAuthCallback"
import { spotifyApi } from "@/shared/api"
import { redirect } from 'next/navigation'

//TODO: handle callback from spotify auth
export const GET = async (request: Request) => {
	await handleAuthCallback(request)
}
