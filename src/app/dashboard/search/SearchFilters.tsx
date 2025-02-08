'use client'

import { Chip } from "@heroui/chip"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
// import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"

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

    useEffect(() => {
        // const newParams = createQueryString('searchType',selectedType)
        // router.push(`/dashboard/search?${newParams}`)
    }, [selectedType])

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
                                        const newParams = createQueryString('type',typeName)
        router.push(`/dashboard/search?${newParams}`)
									}
								}}
                                // as={Link}
                                // href={`/dashboard/search?q=${searchParams.get('q')}&searchType=${typeName}`}
							>
								{typeName}
							</Chip>
                    ))
                }
            </div>
    )
}