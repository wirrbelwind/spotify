'use client'

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


export const AccountDropdown = () => {
    const user = useQuery(
        spotifyApi.getCurrentUsersProfile.queryOptions()
   )

   const image = useMemo(() => {
       return getBestFitImage({
           images: user.data?.images,
           preferredSize: { width: 50, height: 50 }
       })?.url ?? ''
   }, [user.data])

    return (
        <Dropdown>
				<DropdownTrigger>
					<Button
						isIconOnly
						className="p-1 rounded-full"
					>
						<Image
							src={image}
							alt="current user avatar"
							width={50}
							height={50}
							className="rounded-full"
						/>
					</Button>
				</DropdownTrigger>

				<DropdownMenu
					aria-label="Account actions"
				>
					<DropdownItem
						key="account" href={user.data?.external_urls.spotify}
						target="_blank"
					>
						Account
					</DropdownItem>
					<DropdownItem
						key="profile"
						href="/dashboard/me"
					>
						Profile
					</DropdownItem>
					<DropdownItem
						key="settings"
						href="/dashboard/settings"
					>
						Settings
					</DropdownItem>
					<DropdownItem
						key="log-out"
						href="/api/auth/logout"
					>
						Log out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
    )
}