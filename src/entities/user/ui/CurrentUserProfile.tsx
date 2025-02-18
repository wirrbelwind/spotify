'use client'

import { Avatar } from "@heroui/avatar"
import { spotifyApi } from "@/shared/api/spotify-client"
import { Button } from "@heroui/button"
import { useQueryClient } from "@tanstack/react-query"
import { ProfileBannerBase } from "./ProfileBannerBase"
import { getBestFitImage } from "@/shared/lib/getBestFitImage"
import { useMemo } from "react"

export const CurrentUserProfile = () => {
	const user = spotifyApi.getCurrentUsersProfile.useQuery()

	const avatarUrl = useMemo(() => {
		const PLACEHOLDER_IMAGE_URL = '/icons/user.svg'

		if(!user.isSuccess) {
			return PLACEHOLDER_IMAGE_URL
		}

		return getBestFitImage({
			images: user.data.images,
			preferredSize: {
				width: 300,
				height: 300
			}
		})?.url ?? PLACEHOLDER_IMAGE_URL
	}, [])

	return (
		<>
		{user.isSuccess && (
			<ProfileBannerBase
				name={user.data.display_name ?? 'Name placeholder'}
				followersAmount={user.data.followers.total}
				imageUrl={avatarUrl}
			/>
		)}
		</>
	)
}
