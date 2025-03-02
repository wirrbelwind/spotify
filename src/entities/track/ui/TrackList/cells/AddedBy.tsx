import { CellProps } from '../types'

export const AddedBy: React.FC<CellProps> = ({ track, withPlaylistData }) => {
  if (!withPlaylistData) {
    throw new Error(
      'Property "withPlaylistData" is not true, which means, a track has no playlist data and this cell (Added by) shouldn\'t be rendered',
    )
  }

  return (
    <div>
      <p>{track.addedBy.name}</p>
      <p>{new Date(track.addedAt).toString()}</p>
    </div>
  )
}
