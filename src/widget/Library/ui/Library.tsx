import { spotifyApi } from "@/shared/api/spotify-client";
import Image from "next/image";
import Link from "next/link";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { LibraryHeader } from "./LibraryHeader";
import { MediaCard } from "@/shared/ui/MediaCard";
import { getBestFitImage } from "@/shared/lib/getBestFitImage";
import { routeUrl } from "@/shared/lib/route-url";

interface LibrarySidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {

}

export const Library: FC<LibrarySidebarProps> = async (props) => {
	const playlists = await spotifyApi.getCurrentUsersPlaylists.fetch()

	return (
		<aside
			className="self-stretch basis-96 overflow-y-scroll shrink-0 rounded-md  scrollbar-hide"
			{...props}
		>
			<LibraryHeader />

			<div className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-4">
				{playlists?.items.map(playlist => (
					<MediaCard
						key={playlist.id}
						id={playlist.id}
						title={playlist.name}
						imageUrl={getBestFitImage({
							images: playlist.images,
							preferredSize: {width: 150, height: 150}
						})?.url ?? ''}
						playbackUri={playlist.uri}
						url={routeUrl.playlist(playlist.id)}
						subtitle={playlist.owner.display_name ?? undefined}
					/>
				))}
			</div>
		</aside>
	)
}
