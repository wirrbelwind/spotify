import { PlayButton } from "@/widget/Library/ui/PlayButton"
import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"

interface MediaCardProps {
    id: string
    url?: string
    imageUrl?: string
    title: () => JSX.Element
    subtitle?: () => JSX.Element
    playbackUri?: string
}

export const MediaCard = ({
    id,
    url,
    imageUrl,
    title,
    subtitle,
    playbackUri
}: MediaCardProps) => {
    <div
        className="hover:bg-slate-400 h-56 p-2 group rounded-md relative"
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
                className="object-cover w-40 h-40 z-10"
            />

            {
                playbackUri && (
                    <PlayButton uri={playbackUri} />
                )
            }

        </div>

        <p className="mt-3 truncate">
            {title()}
        </p>

        {
            subtitle && (
                <p className="mt-3 truncate">
                    {subtitle()}
                </p>
            )
        }
    </div>
}