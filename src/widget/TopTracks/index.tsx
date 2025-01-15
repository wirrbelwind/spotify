import { TrackListWrapper } from "./TrackListWrapper"

export const TopTracks = () => {
	return (
		<section>
			<p className="text-4xl">Top tracks of the semester</p>
			<p className="mt-2">Only visible for you</p>

			<TrackListWrapper />
		</section>
	)
}
