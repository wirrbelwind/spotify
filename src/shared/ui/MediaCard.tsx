import Image from "next/image"
import { Link } from "./Link"
import { StartPlaybackButton } from "./StartPlaybackButton"

type MediaCardSlot = string | (() => JSX.Element)

interface MediaCardProps {
    id: string
    url?: string
    imageUrl?: string
    isRoundImage?: boolean
    title: MediaCardSlot
    subtitle?: MediaCardSlot
    playbackUri?: string
}

export const MediaCard = ({
    id,
    url,
    imageUrl,
    isRoundImage,
    title,
    subtitle,
    playbackUri
}: MediaCardProps) => {
    return (
        <Link
        href={url ?? '#'}
        
        className="hover:bg-slate-400 p-2 group rounded-md relative block"
    >
        <div className="relative overflow-hidden">
            <Image
                src={imageUrl ?? ''}
                alt=""
                width={160}
                height={160}
                className={`
                    object-cover 
                    w-40 
                    h-40 
                    z-10
                    ${isRoundImage && 'rounded-full'}
                    `}
            />

            {
                playbackUri && (
                    <StartPlaybackButton uri={playbackUri} />
                )
            }

        </div>

        <p className="mt-3 truncate">
            {
                typeof title === 'string' ? title : title()
            }
        </p>

        {
            subtitle && (
                <p className="mt-3 truncate text-small z-30">
                    {
                        typeof subtitle === 'string' ? subtitle : subtitle()
                    }
                </p>
            )
        }
    </Link>
    )
}