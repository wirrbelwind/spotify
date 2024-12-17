import Image from "next/image";
import { getUser } from "@/utils/getUser";
import { $axios } from "@/utils/$axios";
import { PageObject, TrackObject } from "../types";

export default async function HomePage() {
	const user = await getUser()

	const topResponse = await $axios.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks')
	const top = topResponse.data

	const topTrack = top.items[0]

	return <div>
		<h1>{user.display_name}</h1>
		<p>{user.followers.total} followers</p>
		<Image
			alt=""
			src={user.images[0].url}
			width={user.images[0].width}
			height={user.images[0].height}
		/>
		<br />
		<p>{topTrack.name}</p>
		<p>{topTrack.artists.map(artist => artist.name)}</p>
		<p>{topTrack.album.name}</p>
		{topTrack.is_playable && (
			<p>playable</p>
		)}

	</div>;
}
