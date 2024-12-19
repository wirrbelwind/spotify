import { PageObject, SimplifiedPlaylistObject } from "@/app/types"
import { COOKIE_KEYS } from "@/constants";
import { play } from "@/entities/player";
import { Player } from "@/ui/Player";
import { $axios } from "@/utils/$axios"
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { cookies } from "next/headers";
import { PlayButton } from "./PlayButton";


export default async function LibraryPage() {
	const playlists = await (await $axios.get<PageObject<SimplifiedPlaylistObject>>('https://api.spotify.com/v1/me/playlists')).data

	const cookie = await cookies()
	const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value

	return (
		<div>
			
			<Player accessToken={accessToken} />
			<div
				className={`
					flex
					gap-2
					flex-wrap
					`}
			>
				{playlists.items.map(playlist => (
					<div
						key={playlist.id}
					>
						<Image
							src={playlist.images[0].url}
							width={160}
							height={160}
						/>
						
						<PlayButton uri={playlist.uri}/>
						<p>{playlist.name}</p>
					</div>
				))}
			</div>
		</div>
	)

}

