'use client'

import { userOptions } from "@/api/userOptions"
import { Avatar } from "@nextui-org/avatar"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

/**
 * @type client component
 */
export const Profile = () => {
	const user = useQuery(userOptions())

	return (
		<>
			{user.isSuccess && (
				<div className={`
				flex
				items-center
				`}>
					<Avatar
						src={user.data.images[0].url}
						name={user.data.display_name ?? '?'}
						className="w-44 h-44 text-large"
					/>
					<div>
						<p>
							{user.data.display_name}
						</p>
						<p>
							{user.data.followers.total} followers
						</p>
					</div>
				</div>
			)}
		</>
	)
}
