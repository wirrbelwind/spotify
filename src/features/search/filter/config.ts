export const AUDIOBOOKS_DISABLED_TEXT = `Not available in your area. Spotify only gives access to users in the US, UK, Canada, Ireland, New Zealand and Australia`

export type SearchType = "album" | "artist" | "audiobook" | "episode" | "playlist" | "show" | "track" | 'all'

export const allFilterTypes: Array<{
    value: SearchType
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