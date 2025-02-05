import { spotifyApi } from "@/shared/api/spotify-client"

export const checkAuth = async () => {
    const user = await spotifyApi.getCurrentUsersProfile.fetch()

    return Boolean(user)
}