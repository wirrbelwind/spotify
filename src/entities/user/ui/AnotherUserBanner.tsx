import { spotifyApi } from '@/shared/api/spotify-client'
import { ProfileBannerBase } from './ProfileBannerBase'
import { getBestFitImage } from '@/shared/lib/getBestFitImage'

interface AnotherUserProfileProps {
  userId: string
}

export const AnotherUserBanner = async ({ userId }: AnotherUserProfileProps) => {
  const user = await spotifyApi.getUsersProfile.fetch({ userId })

  const avatarUrl =
    getBestFitImage({
      images: user.images,
      preferredSize: { width: 300, height: 300 },
    })?.url ?? '/icons/user.svg'

  return (
    <div>
      <ProfileBannerBase
        name={user.display_name ?? 'Placeholder name'}
        imageUrl={avatarUrl}
        followersAmount={user.followers.total}
      />
    </div>
  )
}
