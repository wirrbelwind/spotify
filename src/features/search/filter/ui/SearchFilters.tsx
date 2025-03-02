'use client'

import { useAudioBooksAccess } from '@/entities/user'
import { useRouter, useSearchParams } from 'next/navigation'
import { MouseEventHandler, useCallback, useState } from 'react'
import { FilterItem } from './FilterItem'
import { allFilterTypes, AUDIOBOOKS_DISABLED_TEXT } from '../config'
import { routeUrl } from '@/shared/lib/route-url'
import { SearchType } from '@/shared/api/spotify-client/sections/search'

export const SearchFilters = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedType, setSelectedType] = useState<SearchType>(searchParams.get('type'))

  const isAudiobooksAllowed = useAudioBooksAccess()

  const handleSelectType: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const target = event.target as HTMLElement
      const typeName = target.closest('[data-filter-type]')?.getAttribute('data-filter-type')

      if (!typeName) {
        throw new Error(
          "Data attribute [data-filter-type] wasn't provided to element. It should be provided for correct work of delegated event.",
        )
      }

      if (selectedType === typeName) {
        return
      } else {
        setSelectedType(typeName)
        const query = searchParams.get('q')
        if (!query) {
          throw new Error('Query is not specified')
        }

        router.push(routeUrl.search(query, typeName))
      }
    },
    [selectedType],
  )

  return (
    <div className="flex gap-4 sticky top-0 z-10 bg-black" onClick={handleSelectType}>
      {allFilterTypes.map((filter) => (
        <FilterItem
          key={filter.value}
          value={filter.value}
          label={filter.label}
          isDisabled={filter.value === 'audiobook' && !isAudiobooksAllowed}
          tooltip={
            filter.value === 'audiobook' && !isAudiobooksAllowed
              ? AUDIOBOOKS_DISABLED_TEXT
              : undefined
          }
          selectedType={selectedType}
          data-filter-type={filter.value}
        />
      ))}
    </div>
  )
}
