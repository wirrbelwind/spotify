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
import Link from "next/link"
import { useDivider } from "@heroui/divider"
import { spotifyApi } from "@/shared/api/spotify-client"
import { AccountDropdown } from "@/features/account-dropdown"
import { SearchBar } from "@/features/search-bar"

export const DashboardHeader = () => {
	

	return (
		<div className="flex justify-between">
			<SearchBar/>
			<AccountDropdown/>
		</div>
	)
}
