import React from "react";
import '../global-styles.css'
import { AllProviders } from "@/shared/providers/AllProviders";
import { Player } from "@/entities/player/ui/Player";
import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { authService, getCurrentUser } from "@/entities/user";

export const metadata = {
  title: "Spotify",
};

export default async function RootLayout({ children }: { children: any }) {
  const auth = await authService()

  const queryClient = new QueryClient()

  const user = await getCurrentUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/icons/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="dark text-foreground bg-background">
        <AllProviders>
          <main className="
          h-dvh 
          overflow-hidden
          flex
          flex-col
          ">
            <div className="basis-full overflow-y-scroll px-4 py-2">
              <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/me">Profile</Link>
                <Link href="/me/library">Library</Link>
              </div>
              {children}
            </div>

            {/* {user && ( */}
              <div className="basis-20 overflow-hidden">
                {JSON.stringify(user)}
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <Player />
                </HydrationBoundary>
              </div>
            {/* )} */}

          </main>
        </AllProviders>
      </body>
    </html>
  );
}
