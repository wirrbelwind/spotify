'use client'

import { userOptions } from "@/entities/user/model/userOptions"
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
				py-10
				px-5
				relative
				`}>
					{/* Blurred image on background */}
					{/* <Image
						src={user.data.images[0].url}
						alt=""
						width={500}
						height={500}
						className={`
						absolute
						top-0
						left-0
						w-full
						h-full
						object-cover
						blur-lg
						`}
					/> */}
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
				</div>
			)}
		</>
	)
}
