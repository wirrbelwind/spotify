'use client'

import { Avatar } from "@heroui/avatar"
import { spotifyApi } from "@/shared/api/spotify-client"
import { Button } from "@heroui/button"
import { useQueryClient } from "@tanstack/react-query"

export const Profile = () => {
	const user = spotifyApi.getCurrentUsersProfile.useQuery()

	const client = useQueryClient()

	return (
		<>
		{user.isSuccess && (
			<div className={`
				flex
				items-center
				py-10
				px-5
				relative
				`}>
					<Avatar
						src={user.data.images[0].url}
						name={user.data.display_name ?? '?'}
						className="w-44 h-44 text-large"
					/>
					<div className="ml-7">
						<p className="font-bold text-5xl">
	
							{user.data.display_name}
						</p>
						<p className="mt-3">
							{user.data.followers.total} followers
						</p>
					</div>
	
					<Button onPress={() => {
						client.setQueryData(
							spotifyApi.getCurrentUsersProfile.queryOptions().queryKey,
							data => {
								if(!data) {
									return data
								}
								console.log(data)
	
								return {
									country: '',
									display_name: '123',
									email: 'email',
									external_urls: {
										spotify: 'sdada',
									},
									followers: {
										href: 'asdsada',
										total: 123
									},
									href: 'dsadsadsa',
									id: 'id',
									images: [],
									product: 'premium',
									type: 'user',
									uri: 'uri'
								}
							}
						)
						// client.invalidateQueries({
						// 	queryKey: spotifyApi.getCurrentUsersProfile.queryOptions().queryKey
						// })
					}}>Mock user name</Button>
				</div>
		)}
		</>
	)
}
