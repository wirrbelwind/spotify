import Image from "next/image";
import { getUser } from "@/utils/getUser";

export default async function HomePage() {
	const user = await getUser()
	
	return <div>
		{JSON.stringify(user)}
		<h1>{user.display_name}</h1>
		<p>{user.followers.total} followers</p>
		<Image 
			alt=""
			src={user.images[0].url}
			width={user.images[0].width}
			height={user.images[0].height}
		/>
	</div>;
}
