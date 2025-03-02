import { Player } from "@/entities/player/ui/Player";
import { Image } from "@heroui/image";
import Link from "next/link";
import { authService } from '@/entities/user';

export default async function LibraryPage() {

	return (
		<div>

			{/* <div
				className={`
					grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-4
					`}
			>
				{playlists.items.map(playlist => (
					<div
						key={playlist.id}
						className="hover:bg-slate-400 h-56 p-2 group rounded-md relative"
					>
						<Link
							href={`/playlist/${playlist.id}`}
							className="w-full h-full absolute top-0 bottom-0 left-0 right-0 z-20"
						></Link>
						<div className="relative overflow-hidden">
							<Image
								src={playlist.images[0].url}
								// width={160}
								// height={160}

								classNames={{
									img: "object-cover w-40 h-40 z-10",
									wrapper: 'mx-auto'
								}}
							/>

							<PlayButton uri={playlist.uri} />
						</div>

						<p className="mt-3 truncate">{playlist.name}</p>
					</div>
				))}
			</div> */}
		</div>
	)

}

