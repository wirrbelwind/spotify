import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { Button } from "@heroui/button"
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useMemo } from "react"
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
} from "@heroui/dropdown";
import { useDivider } from "@heroui/divider"
import { spotifyApi } from "@/shared/api/spotify-client"
import { AccountDropdown } from "@/features/account-dropdown"
import { SearchBar } from "@/features/search/input"
import { makeQueryClient } from "@/shared/lib/makeQueryClient"
import { Link } from "@/shared/ui/Link"
import { routeUrl } from "@/shared/lib/route-url"

export const DashboardHeader = async () => {
	const queryClientUser = makeQueryClient()

	await queryClientUser.prefetchQuery(
		spotifyApi.getCurrentUsersProfile.queryOptions()
	)


	return (
		<div className="flex justify-between items-center">
			<Link href={routeUrl.dashboard()} className="bg-gray-500 rounded-full p-1">
				<Image
					alt="home"
					width={35}
					height={35}
					src="/icons/home.svg"
				/>
			</Link>
			<SearchBar />
			<HydrationBoundary state={dehydrate(queryClientUser)}>
				<AccountDropdown />
			</HydrationBoundary>
		</div>
	)
}
