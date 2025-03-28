import React from 'react'
import '../global-styles.css'
import { AllProviders } from '@/shared/providers/AllProviders'
import { Player } from '@/entities/player/ui/Player'
import Link from 'next/link'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Library } from '@/widget/Library'
import { DashboardHeader } from '@/widget/DashboardHeader'
import { spotifyApi } from '@/shared/api/spotify-client'

export const metadata = {
  title: 'Spotify',
}

export default async function DashboardLayout({ children }: { children: any }) {
  return (
    <main
      className="
    h-dvh 
    flex
    flex-col
    "
    >
      <div className="basis-full overflow-y-hidden px-4 py-2 flex gap-6 items-start">
        <Library />

        <main className="h-full basis-full overflow-y-scroll">
          <DashboardHeader />
          {children}
        </main>
      </div>

      <div className="basis-20 overflow-hidden">
        <Player />
      </div>
    </main>
  )
}
