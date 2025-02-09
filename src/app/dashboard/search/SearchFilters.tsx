'use client'

import { useAudioBooksAccess } from "@/entities/user"
import { spotifyApi } from "@/shared/api/spotify-client"
import { Chip } from "@heroui/chip"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Tooltip } from "@heroui/tooltip";

export const SearchFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const [selectedType, setSelectedType] = useState(searchParams.get('type'))

    const isAudiobooksAllowed = useAudioBooksAccess()

    return (
        <div className="flex gap-4 sticky top-0 z-10 bg-black">
            {
                [
                    'all',
                    'album',
                    'track',
                    'artist',
                    'audiobook',
                    'episode',
                    'playlist',
                    'show'
                ].map(typeName => typeName === 'audiobook' ? (
                    <Chip
                        key={typeName}
                        className={`
								${selectedType === typeName && 'bg-green-600'}
								cursor-pointer
                                flex 
                                gap-2
                                items-center
							`}
                        isDisabled={!isAudiobooksAllowed}
                        onClick={() => {
                            if (selectedType === typeName) {
                                return
                            }
                            else {
                                setSelectedType(typeName)
                                const newParams = createQueryString('type', typeName)
                                router.push(`/dashboard/search?${newParams}`)
                            }
                        }}
                    >
                        <Image
                            alt=""
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            src="/icons/lock.svg"
                        />
                        <span>{typeName}</span>
                    </Chip>
                ) : (
                    <Chip
                        key={typeName}
                        className={`
								${selectedType === typeName && 'bg-green-600'}
								cursor-pointer
							`}
                        onClick={() => {
                            if (selectedType === typeName) {
                                return
                            }
                            else {
                                setSelectedType(typeName)
                                const newParams = createQueryString('type', typeName)
                                router.push(`/dashboard/search?${newParams}`)
                            }
                        }}
                    >
                        {typeName}
                    </Chip>
                ))
            }
        </div>
    )
}
