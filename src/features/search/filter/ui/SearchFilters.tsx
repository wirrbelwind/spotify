'use client'

import { useAudioBooksAccess } from "@/entities/user"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { FilterItem } from "./FilterItem"
import { AUDIOBOOKS_DISABLED_TEXT } from "../config"

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
                ].map(typeName => (
                    <FilterItem  
                        filterType={typeName}
                        isDisabled={typeName === 'audiobook' && !isAudiobooksAllowed}
                        tooltip={
                            (typeName === 'audiobook' && !isAudiobooksAllowed)
                            ? 
                            AUDIOBOOKS_DISABLED_TEXT 
                            : 
                            undefined
                        }
                        selectedType={selectedType}
                        onSelect={() => {
                            if (selectedType === typeName) {
                                return
                            }
                            else {
                                setSelectedType(typeName)
                                const newParams = createQueryString('type', typeName)
                                router.push(`/dashboard/search?${newParams}`)
                            }
                        }}
                    />
                ))
            }
        </div>
    )
}

// onClick={() => {
    // if (selectedType === filterType) {
    //     return
    // }
    // else {
    //     setSelectedType(typeName)
    //     const newParams = createQueryString('type', typeName)
    //     router.push(`/dashboard/search?${newParams}`)
    // }
// }}