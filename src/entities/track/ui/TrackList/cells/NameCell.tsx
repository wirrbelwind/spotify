import Link from 'next/link'
import React from 'react'
import { CellProps } from '../types'
import { LinksTextList } from '@/shared/ui/LinksTextList'

export const NameCell: React.FC<CellProps> = ({ track, withPlaylistData }) => {
  const artists = track.artists.map((artist) => ({
    label: artist.name,
    url: artist.url,
  }))

  return (
    <div>
      <p>{track.name}</p>
      <p>
        <LinksTextList links={artists} />
      </p>
    </div>
  )
}
