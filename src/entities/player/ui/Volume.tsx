'use client'

import { useChangeVolume } from '../model/useChangeVolume'
import { INITIAL_VOLUME } from '../constants'
import { Button } from '@heroui/button'
import Image from 'next/image'
import { MouseEventHandler, useRef, useState } from 'react'

export const Volume = () => {
  const volume = useChangeVolume()
  const sliderRef = useRef<HTMLElement | null>(null)
  const volumeBeforeMute = useRef<null | number>(null)
  const [muted, setMuted] = useState(false)

  const handleToggleVolume = () => {
    if (!sliderRef.current) {
      throw new Error('sliderRef is not connected to html element')
    }

    const currentVolume = sliderRef.current.value

    if (currentVolume && currentVolume > 0) {
      volumeBeforeMute.current = currentVolume

      sliderRef.current.value = 0
      volume.mutate({ newValue: 0 })
      setMuted(true)
    } else {
      sliderRef.current.value = volumeBeforeMute.current
      volume.mutate({ newValue: volumeBeforeMute.current })
      setMuted(false)
    }
  }

  const handleChangeVolume: MouseEventHandler<HTMLInputElement> = (e) => {
    const newValue = Number(e.currentTarget.value)
    volume.mutate({ newValue })
  }

  return (
    <div className="flex gap-2">
      <Button isIconOnly onPress={handleToggleVolume}>
        {muted ? (
          <Image src="/icons/mute.svg" width={35} height={35} alt="Mute" />
        ) : (
          <Image src="/icons/unmute.svg" width={35} height={35} alt="Unmute" />
        )}
      </Button>

      <input
        type="range"
        defaultValue={INITIAL_VOLUME}
        step={0.01}
        max={1}
        ref={sliderRef}
        onMouseUp={handleChangeVolume}
      />
    </div>
  )
}
