import { redirect } from "next/navigation"

export const redirectToSearch = (query: string, searchType: string | null) => {
    const url = `/dashboard/search?q=${query}&type=${searchType ?? 'all'}`
    redirect(url)
}