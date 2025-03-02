import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { spotifyApi } from '@/shared/api/spotify-client'
import { makeQueryClient } from '@/shared/lib/makeQueryClient'
import { CurrentUserBanner } from '@/entities/user'
import { TopArtists } from '@/widget/TopArtists'
import { Divider } from '@heroui/divider'
import { TRACKS_QUANTITY, TopTracks } from '@/widget/TopTracks'

export default async function HomePage() {
  const queryClientTopTracks = makeQueryClient()

  queryClientTopTracks.prefetchQuery(
    spotifyApi.getCurrentUsersTopTracks.queryOptions({ quantity: TRACKS_QUANTITY }),
  )

  const queryClientUser = makeQueryClient()

  queryClientUser.prefetchQuery(spotifyApi.getCurrentUsersProfile.queryOptions())

  // const topResponse = await spotifyApi.get<PageObject<TrackObject>>('https://api.spotify.com/v1/me/top/tracks?limit=10')
  // const topTrackList = topResponse.data

  // const topArtistList = (await spotifyApi.get<PageObject<ArtistObject>>('https://api.spotify.com/v1/me/top/artists?limit=5')).data

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClientUser)}>
        <CurrentUserBanner />
      </HydrationBoundary>

      <HydrationBoundary state={dehydrate(queryClientTopTracks)}>
        <TopTracks />
      </HydrationBoundary>

      <Divider className="my-5 opacity-0" />
      <TopArtists />
    </div>
  )
}

{
  /* <div className={`
			flex
			items-center
			`}>
				<Avatar
					src={user.images[0].url}
					name={user.display_name ?? '?'}
					className="w-44 h-44 text-large"
				/>
				<div>
					<p>
						{user.display_name}
					</p>
					<p>
						{user.followers.total} followers
					</p>
				</div>
			</div>

			<p>Top Artists</p>
			<div className={`
			flex
			gap-2
			flex-wrap
				`}>
				{topArtistList.items.map(artist => (
					<div
						key={artist.id}
					>
						<Image
							src={artist.images?.[0]?.url}

							className="rounded-full w-40 h-40"
						/>
						<p>{artist.name}</p>
					</div>
				))}
			</div> */
}
