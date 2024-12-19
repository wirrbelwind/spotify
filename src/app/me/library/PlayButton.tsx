'use client'

import { play } from "@/entities/player"
import { Button } from "@nextui-org/button"
import { usePlayerDevice } from "react-spotify-web-playback-sdk"

interface PlayButtonProps {
	uri: string
}

export const PlayButton: React.FC<PlayButtonProps> = ({ uri }) => {
	const device = usePlayerDevice()
	return (
		<form action={play}>
			<Button
				type="submit"
			>
				{device?.device_id} | {uri}
			</Button>

			<input
				type="hidden"
				name="uri"
				defaultValue={uri}
			/>

			<input
				type="hidden"
				name="device-id"
				defaultValue={device?.device_id}
			/>
		</form>
	)
}
