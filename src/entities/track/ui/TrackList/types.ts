export type ColumnType = 'play' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'
export type PlaylistColumnType = 'added-at' | 'added-by'

export interface ListItem {
  id: string
  uri: string
  name: string
  artists: Array<{
    name: string
    url: string | null
  }>
  album: {
    name: string
    images: Array<{
      url: string
      height: number | null
      width: number | null
    }>
  }
  durationMs: number
}

export interface ListItemWithPlaylistData extends ListItem {
  addedAt: string
  addedBy: {
    name: string
  }
}

interface CellPropsBase {
  withPlaylistData?: boolean
  trackIndex: number
  likes: boolean[] | undefined
}

interface CellPropsCommon extends CellPropsBase {
  withPlaylistData?: false | undefined
  track: ListItem
  allTracks: ListItem[]
}

interface CellPropsWithPlaylistData extends CellPropsBase {
  withPlaylistData: true
  track: ListItemWithPlaylistData
  allTracks: ListItemWithPlaylistData[]
}

export type CellProps = CellPropsCommon | CellPropsWithPlaylistData
