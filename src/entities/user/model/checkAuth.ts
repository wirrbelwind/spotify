import { spotifyApi } from "@/shared/api/spotify-client"

export const checkAuth = async (): Promise<boolean> => {
    try {
        const user = await spotifyApi.getCurrentUsersProfile.fetch()

        return Boolean(user)
    }
    catch {
        return false
    }
}