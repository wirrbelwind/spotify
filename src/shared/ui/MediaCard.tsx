import { PlayButton } from "@/widget/Library/ui/PlayButton"
import Image from "next/image"
import Link from "next/link"
import React from "react"

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
        <div
        className="hover:bg-slate-400 p-2 group rounded-md relative"
    >
        {
            url && (
                <Link
                    href={url}
                    className="w-full h-full absolute top-0 bottom-0 left-0 right-0 z-20"
                ></Link>
            )
        }
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
                    <PlayButton uri={playbackUri} />
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
                <p className="mt-3 truncate text-small">
                    {
                        typeof subtitle === 'string' ? subtitle : subtitle()
                    }
                </p>
            )
        }
    </div>
    )
}