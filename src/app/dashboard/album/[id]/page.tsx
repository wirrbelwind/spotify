import { AlbumHero } from './AlbumHero'
import { AlbumTracks } from './AlbumTracks'

interface AlbumPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const albumId = (await params).id

  return (
    <div>
      <AlbumHero albumId={albumId} />
      <AlbumTracks albumId={albumId} />
    </div>
  )
}
