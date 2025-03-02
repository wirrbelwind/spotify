'use client'
import { HeroUIProvider as HeroUIProviderLibrary } from '@heroui/system'
import { FC, PropsWithChildren } from 'react'

export const HeroUIProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HeroUIProviderLibrary>
      {children}
    </HeroUIProviderLibrary>
  )
