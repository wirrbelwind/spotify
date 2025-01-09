
import { TrackList } from "@/entities/track/ui/TrackList/TrackList"

export const TopTracks = () => {
	return (
		<section>
			<p className="text-4xl">Top tracks this month</p>
			<p className="mt-2">Only visible for you</p>

			<TrackList
				hideHeader
				classNames={{
					wrapper: 'mt-2'
				}}
				columns={[
					'order',
					'avatar',
					'name',
					'album',
					'liked',
					'duration'
				]}
			/>
		</section>
	)
}
