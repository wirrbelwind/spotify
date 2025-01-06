import React from "react";
import '../global-styles.css'
import { AllProviders } from "@/providers/AllProviders";
import { Player } from "@/entities/player/ui/Player";
import UserEntity from "@/entities/user";
import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const metadata = {
  title: "Spotify",
};

export default async function RootLayout({ children }: { children: any }) {
  const auth = await UserEntity.authService()

  const queryClient = new QueryClient()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
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
            <div className="basis-11/12 overflow-y-scroll">
              <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/me">Profile</Link>
                <Link href="/me/library">Library</Link>
              </div>
              {children}
            </div>
            <div className="basis-3/12 overflow-hidden">
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Player token={auth.tokens.accessToken} />
              </HydrationBoundary>
            </div>
          </main>
        </AllProviders>
      </body>
    </html>
  );
}
