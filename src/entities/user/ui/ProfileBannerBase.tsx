import { Avatar } from '@heroui/avatar'

interface ProfileBannerBaseProps {
  imageUrl: string
  name: string
  followersAmount: number
}

export const ProfileBannerBase = ({ name, imageUrl, followersAmount }: ProfileBannerBaseProps) => {
  return (
    <div className={`
				flex
				items-center
				py-10
				px-5
				relative
				`}
      <Avatar
        src={imageUrl}
        name={name}
        className="w-44 h-44 text-large"
      />
      <div className="ml-7">
        <p className="font-bold text-5xl">

          {name}
        </p>
        <p className="mt-3">
          {followersAmount} followers
        </p>
      </div>

      {/* <Button onPress={() => {
						client.setQueryData(
							spotifyApi.getCurrentUsersProfile.queryOptions().queryKey,
							data => {
								if(!data) {
									return data
								}
								console.log(data)
	
								return {
									country: '',
									display_name: '123',
									email: 'email',
									external_urls: {
										spotify: 'sdada',
									},
									followers: {
										href: 'asdsada',
										total: 123
									},
									href: 'dsadsadsa',
									id: 'id',
									images: [],
									product: 'premium',
									type: 'user',
									uri: 'uri'
								}
							}
						)
						// client.invalidateQueries({
						// 	queryKey: spotifyApi.getCurrentUsersProfile.queryOptions().queryKey
						// })
					}}>Mock user name</Button> */}
    </div>
  )
}
