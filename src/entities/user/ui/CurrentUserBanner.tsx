'use client'

import { Avatar } from '@heroui/avatar'
import { spotifyApi } from '@/shared/api/spotify-client'
import { Button } from '@heroui/button'
import { useQueryClient } from '@tanstack/react-query'
import { ProfileBannerBase } from './ProfileBannerBase'
import { getBestFitImage } from '@/shared/lib/getBestFitImage'
import { useMemo } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Image } from '@/shared/ui/Image'
import { routeUrl } from '@/shared/lib/route-url'

export const CurrentUserBanner = () => {
  const user = spotifyApi.getCurrentUsersProfile.useQuery()

  const avatarUrl = useMemo(() => {
    const PLACEHOLDER_IMAGE_URL = '/icons/user.svg'

    if (!user.isSuccess) {
      return PLACEHOLDER_IMAGE_URL
    }

    return (
      getBestFitImage({
        images: user.data.images,
        preferredSize: {
          width: 300,
          height: 300,
        },
      })?.url ?? PLACEHOLDER_IMAGE_URL
    )
  }, [])

  return (
    <div>
      {user.isSuccess && (
        <ProfileBannerBase
          name={user.data.display_name ?? 'Name placeholder'}
          followersAmount={user.data.followers.total}
          imageUrl={avatarUrl}
        />
      )}

      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <Image
              src="/icons/more.svg"
              width={32}
              height={32}
              className="w-8 h-8"
              alt="context menu of your profile"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          onAction={(action) => {
            if (action === 'share') {
              navigator.clipboard.writeText(routeUrl.user(user.data.id))
            }
          }}
        >
          <DropdownItem key="share">Copy link to profile</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
