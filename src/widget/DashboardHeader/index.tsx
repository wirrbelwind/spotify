'use client'

import { userOptions } from "@/entities/user/model/userOptions"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { Button } from "@heroui/button"
import { useQuery } from "@tanstack/react-query"
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
import { Link } from "@heroui/link"

export const DashboardHeader = () => {

	return (
		<div className="flex justify-between items-center">
			<Link href="/dashboard" className="bg-gray-500 rounded-full p-1">
				<Image
					alt="home"
					width={35}
					height={35}
					src="/icons/home.svg"
				/>
			</Link>
			<SearchBar/>
			<AccountDropdown/>
		</div>
	)
}
