import React from 'react'
import '../global-styles.css'
import { Player } from '@/entities/player/ui/Player'
import { Library } from '@/widget/Library'
import { DashboardHeader } from '@/widget/DashboardHeader'

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
