import { SearchTypeApi } from "@/shared/api/spotify-client/sections/search"

export const AUDIOBOOKS_DISABLED_TEXT = `Not available in your area. Spotify only gives access to users in the US, UK, Canada, Ireland, New Zealand and Australia`


export const allFilterTypes: Array<{
    value: SearchTypeApi | 'all'
    label: string
}> = [
    {
        value: 'all',
        label: 'All'
    },
    {
        value: 'artist',
        label: 'Artists'
    },
    {
        value: 'playlist',
        label: 'Playlists'
    },
    {
        value: 'track',
        label: 'Tracks'
    },
    {
        value: 'album',
        label: 'Albums'
    },
    {
        value: 'show',
        label: 'Shows'
    },
    {
        value: 'episode',
        label: 'Episodes'
    },
    {
        value: 'audiobook',
        label: 'Audiobooks'
    },
]