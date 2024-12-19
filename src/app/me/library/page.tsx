import { PageObject, SimplifiedPlaylistObject } from "@/app/types"
import { Player } from "@/ui/Player";
import { $axios } from "@/utils/$axios"
import { Image } from "@nextui-org/image";
import { PlayButton } from "./PlayButton";
import UserEntity from "@/entities/user";

export default async function LibraryPage() {
	const playlists = await (await $axios.get<PageObject<SimplifiedPlaylistObject>>('https://api.spotify.com/v1/me/playlists')).data

	const auth = await UserEntity.authService()

	return (
		<div>

			<Player accessToken={auth.tokens.accessToken} />
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
						<div className="relative">
							<Image
								src={playlist.images[0].url}
								width={160}
								height={160}
							/>

							<PlayButton uri={playlist.uri} />
						</div>

						<p>{playlist.name}</p>
					</div>
				))}
			</div>
		</div>
	)

}

