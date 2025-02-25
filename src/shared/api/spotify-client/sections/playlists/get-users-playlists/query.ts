import { 
    queryOptions as queryOptionsLib,
    DefinedInitialDataOptions
 } from "@tanstack/react-query"
import { fetchUsersPlaylists, FetchUsersPlaylistsArgs } from "./http-request"

export const queryOptions = ({
    override,
    userId,
    limit,
    offset
}: FetchUsersPlaylistsArgs & {
    override?: () => DefinedInitialDataOptions  
}) => {
    return queryOptionsLib({
        queryKey: ['user-playlists', , 'get'],
        queryFn: () => fetchUsersPlaylists({
            userId,
            limit,
            offset
        }),
        ...override
    })
}
