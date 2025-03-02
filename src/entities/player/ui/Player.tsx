'use client'

import { Timeline } from './Timeline'
import { ActionButtons } from './ActionButtons'
import { usePlayerState } from '../model/usePlayerState'
import { CurrentTrackInfo } from './CurrentTrackInfo'
import { Volume } from './Volume'

export const Player = () => {
  const player = usePlayerState()

  return (
    <div className="px-4 py-2 grid grid-rows-1 grid-cols-[1fr_3fr_1fr] items-center">
      <div>
        <CurrentTrackInfo />
      </div>

      <div className="">
        <ActionButtons
          elementsProps={{
            wrapper: {
              className: 'flex gap-4  items-center justify-center',
            },
          }}
        />

        <Timeline
          elementsProps={{
            wrapper: {
              className: 'flex items-center justify-center gap-2',
            },
          }}
        />
      </div>

      <div>
        <Volume />
      </div>
    </div>
  )
}
