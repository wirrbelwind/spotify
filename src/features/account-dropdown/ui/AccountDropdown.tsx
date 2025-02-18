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
	DropdownItem,
} from "@heroui/dropdown";
import Link from "next/link"
import { spotifyApi } from "@/shared/api/spotify-client"

export const AccountDropdown = () => {
    const user = useQuery(
        spotifyApi.getCurrentUsersProfile.queryOptions()
   )

   const imageSrc = useMemo(() => {
	if(!user.isSuccess) {
		return 'nothing'
	}

       return getBestFitImage({
           images: user.data?.images,
           preferredSize: { width: 50, height: 50 }
       })?.url ?? ''
   }, [user.isSuccess, user.data])

    return (
        <Dropdown>
				<DropdownTrigger>
					<Button
						isIconOnly
						className="p-1 rounded-full"
					>
						<Image
							src={imageSrc}
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
						as={Link}
					>
						Profile
					</DropdownItem>
					<DropdownItem
						key="settings"
						href="/dashboard/settings"
						as={Link}
					>
						Settings
					</DropdownItem>
					<DropdownItem
						key="log-out"
						href="/api/auth/logout"
						as={Link}
					>
						Log out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
    )
}