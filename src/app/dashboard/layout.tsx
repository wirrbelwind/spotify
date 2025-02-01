import React from "react";
import '../../global-styles.css'
import { AllProviders } from "@/shared/providers/AllProviders";
import { Player } from "@/entities/player/ui/Player";
import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { LibrarySidebar } from "@/widget/LibrarySidebar";
import { DashboardHeader } from "@/widget/DashboardHeader";
import { userOptions } from "@/entities/user/model/userOptions";

export const metadata = {
  title: "Spotify",
};

export default async function DashboardLayout({ children }: { children: any }) {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(userOptions())

  return (
    <main className="
    h-dvh 
    overflow-hidden
    flex
    flex-col
    ">
      <div className="basis-full overflow-y-hidden px-4 py-2 flex gap-6 items-start">
        <LibrarySidebar />

        <main className="basis-full">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <DashboardHeader />
          </HydrationBoundary>
          {children}
        </main>
      </div>

      <div className="basis-20 overflow-hidden">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Player />
        </HydrationBoundary>
      </div>

    </main>
  );
}
