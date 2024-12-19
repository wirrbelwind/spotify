import React from "react";
import '../global-styles.css'
import { Providers } from "@/Providers";

export const metadata = {
  title: "Spotify",
};

export default function RootLayout({ children }: { children: any }) {
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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
