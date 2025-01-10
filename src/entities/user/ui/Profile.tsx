import { Avatar } from "@nextui-org/avatar"
import { getCurrentUser } from "../model/getCurrentUser"

export const Profile = async () => {
	const user = await getCurrentUser()

	return (
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
					src={user.images[0].url}
					name={user.display_name ?? '?'}
					className="w-44 h-44 text-large"
				/>
				<div className="ml-7">
					<p className="font-bold text-5xl">

						{user.display_name}
					</p>
					<p className="mt-3">
						{user.followers.total} followers
					</p>
				</div>
			</div>
	)
}
