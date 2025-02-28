import { SearchType } from "@/shared/api/spotify-client/sections/search";

export const routeUrl = {
  dashboard: () => "/dashboard",
  user: (id: string | number) => `/dashboard/user/${id}`,
  playlist: (id: string | number) => `/dashboard/playlist/${id}`,
  album: (id: string | number) => `/dashboard/album/${id}`,
  artist: (id: string | number) => `/dashboard/artist/${id}`,
  profile: () => "/dashboard/me",
  settings: () => "/dashboard/settings",
  search: (query: string, searchType: SearchType) => {
    const params = new URLSearchParams({ q: query, searchType });
    return `/dashboard/search?${params.toString()}`;
  },
  auth: () => {
    return `${process.env.NEXT_PUBLIC_APP_URL}/auth`
  },
  show: (id: string) => `/dashboard/show/${id}`,
  episode: (id: string) => `/dashboard/episode/${id}`
}