import NextLink from 'next/link'
import { CellProps } from '../types'
import { Link } from '@/shared/ui/Link'

export const AlbumCell: React.FC<CellProps> = ({ track, withPlaylistData }) => {
  return <Link href="">{track.album.name}</Link>
}
