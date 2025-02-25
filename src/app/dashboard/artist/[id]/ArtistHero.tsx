import { spotifyApi } from "@/shared/api/spotify-client"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { Image } from "@/shared/ui/Image"
import { useMemo } from "react"

interface ArtistHeroProps {
    artistId: string
}

export const ArtistHero = async ({ artistId }: ArtistHeroProps) => {
    const artist = await spotifyApi.getArtist.fetch({ artistId })

    const avatarUrl = getBestFitImage({
        images: artist.images,
        preferredSize: { width: 300, height: 300 }
    })?.url ?? '/icons/user.svg'

    return (
        <div className="flex gap-4 items-center">
            <Image
                alt=""
                src={avatarUrl}
                width={160}
                height={160}
                className="object-cover w-40 h-40 rounded-full"
            />
            <div>
                <p className="text-4xl">
                    {artist.name}
                </p>
                <p>{artist.followers.total} listeners</p>
                <p>
                <span>Genres: </span>
                <span>{artist.genres.join(', ')}</span>
                </p>
            </div>
        </div>
    )
}