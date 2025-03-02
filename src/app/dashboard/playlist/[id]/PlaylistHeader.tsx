'use client'

import { getBestFitImage } from '@/shared/lib/getBestFitImage'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { FC, useMemo } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal'
import { Input, Textarea } from '@heroui/input'
import { spotifyApi } from '@/shared/api/spotify-client'
import { Link } from '@/shared/ui/Link'
import { routeUrl } from '@/shared/lib/route-url'
import { StartPlaybackButton } from '@/features/playback/start-playback'

interface HeaderProps {
  playlistId: string
}

export const PlaylistHeader: FC<HeaderProps> = ({ playlistId }) => {
  const playlist = useQuery(spotifyApi.getPlaylist.queryOptions({ id: playlistId }))

  const image = useMemo(() => {
    if (!playlist.isSuccess) {
      return null
    }

    return getBestFitImage({
      images: playlist.data?.images,
      preferredSize: { width: 150, height: 150 },
    })
  }, [playlist.data])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const user = useQuery(spotifyApi.getCurrentUsersProfile.queryOptions())

  const isEditable = useMemo(() => {
    return playlist.data?.owner.id === user.data?.id
  }, [])

  return (
    <div className="flex gap-4 items-center py-8 px-4">
      {playlist.isLoading && !playlist.data && <Spinner />}
      {playlist.isSuccess && (
        <>
          <div className="w-40 h-40 relative shrink-0 group/edit">
            <Image
              src={image?.url ?? ''}
              alt="Playlist's avatar"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
            {isEditable && (
              <Button
                className="absolute top-0 left-0 w-full h-full bg-gray-500 flex flex-col gap-4 border-none opacity-0"
                onPress={onOpen}
              >
                <Image src="/icons/pencil.svg" alt="edit" width={50} height={50} />
                <p className="text-xl">Choose photo</p>
              </Button>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <p>{playlist.data.public ? 'Public playlist' : 'Private playlist'}</p>
            <p className="text-6xl font-bold">{playlist.data?.name}</p>
            <p className="text-gray-400">{playlist.data?.description}</p>
            {playlist.data?.collaborative && <p>Collaborative</p>}
            <p className="font-bold">
              <Link href={routeUrl.user(playlist.data.owner.id)}>
                {playlist.data.owner.display_name}
              </Link>
              <span> • </span>
              <span>{playlist.data.tracks.total} songs</span>
            </p>

            <StartPlaybackButton uri={playlist.data.uri} />
          </div>
        </>
      )}

      {isEditable && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit details</ModalHeader>
                <ModalBody>
                  <div className="grid grid-flow-col grid-rows-3 ">
                    <Image
                      src={image?.url}
                      alt=""
                      width={160}
                      height={160}
                      className="row-span-3 w-40 h-40 object-cover"
                    />

                    <Input
                      placeholder="Add a name"
                      defaultValue={playlist.data?.name}
                      className="col-span-2"
                    />
                    <Textarea
                      placeholder="Add an optional description"
                      defaultValue={playlist.data?.description}
                      className="col-span-2 row-span-2"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
