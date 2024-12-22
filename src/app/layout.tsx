import React from "react";
import '../global-styles.css'
import { AllProviders } from "@/providers/AllProviders";
import { Player } from "@/entities/player/ui/Player";
import UserEntity from "@/entities/user";
import Link from "next/link";

export const metadata = {
  title: "Spotify",
};

export default async function RootLayout({ children }: { children: any }) {
  const auth = await UserEntity.authService()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <ColorSchemeScript /> */}
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
            <div className="basis-1/12 overflow-hidden">
              <Player accessToken={auth.tokens.accessToken} />
            </div>
          </main>
        </AllProviders>
      </body>
    </html>
  );
}
