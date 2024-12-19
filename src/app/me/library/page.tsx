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
					grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-4
					`}
			>
				{playlists.items.map(playlist => (
					<div
						key={playlist.id}
						className="hover:bg-slate-400 h-56 p-2 group "
					>
						<div className="relative overflow-hidden">
							<Image
								src={playlist.images[0].url}
								// width={160}
								// height={160}

								classNames={{
									img: "object-cover w-40 h-40",
									wrapper: 'mx-auto'
								}}
							/>

							<PlayButton uri={playlist.uri} />
						</div>

						<p className="mt-3 truncate">{playlist.name}</p>
					</div>
				))}
			</div>
		</div>
	)

}

