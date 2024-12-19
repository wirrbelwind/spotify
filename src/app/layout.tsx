import React from "react";
import '../global-styles.css'
import { AllProviders } from "@/providers/AllProviders";

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
        <AllProviders>
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
