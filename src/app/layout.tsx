import '../global-styles.css'
import { AllProviders } from "@/shared/providers/AllProviders";

export const metadata = {
  title: "Spotify",
};

export default async function DashboardLayout({ children }: { children: any }) {
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
         {children}
        </AllProviders>
      </body>
    </html>
  );
}
