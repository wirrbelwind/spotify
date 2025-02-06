import { millisecondsToTime } from "@/shared/lib/millisecondsToTime"
import { LinksTextList } from "@/shared/ui/LinksTextList"
import Image from "next/image"

interface TrackStripProps {
    imageSrc?: string
    name: string
    artists: Array<{
        label: string
        url: string
    }>
    duration: number
}

export const TrackStrip = ({
    artists,
    duration,
    name,
    imageSrc
}: TrackStripProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Image
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 object-cover"
                src={imageSrc ?? ''}
            />

            <div>
                <p>{name}</p>
                <p>
                    <LinksTextList links={artists}/>
                </p>
            </div>

            <p>{millisecondsToTime(duration)}</p>
        </div>
    )
}
