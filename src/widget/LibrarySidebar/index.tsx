import { spotifyClient } from "@/shared/api/spotify-client";
import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { PlayButton } from "./PlayButton";
import { Header } from "./Header";

interface LibrarySidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {

}

export const LibrarySidebar: FC<LibrarySidebarProps> = async (props) => {
	const playlists = await spotifyClient.getCurrentUserPlaylists()

	return (
		<aside
			className="self-stretch basis-96 overflow-y-scroll shrink-0 rounded-md  scrollbar-hide"
			{...props}
		>
			<Header />
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-4">
				{playlists?.items.map(playlist => (
					<div
						key={playlist.id}
						className="hover:bg-slate-400 h-56 p-2 group rounded-md relative"
					>
						<Link
							href={`/dashboard/playlist/${playlist.id}`}
							className="w-full h-full absolute top-0 bottom-0 left-0 right-0 z-20"
						></Link>
						<div className="relative overflow-hidden">
							<Image
								src={playlist.images[0].url}
								alt=""
								width={160}
								height={160}
								className="object-cover w-40 h-40 z-10"
							/>

							<PlayButton uri={playlist.uri} />
						</div>

						<p className="mt-3 truncate">{playlist.name}</p>
					</div>
				))}
			</div>
		</aside>
	)
}
