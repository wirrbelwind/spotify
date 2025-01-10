'use server'

import { spotifyApi } from "@/shared/api"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../constants"
import { spotifyClient } from "@/shared/api/spotify-client"

interface StartAudioArgs {
	contextUri?: string
	audioUris?: string[]
	offset?: string | number
}

export const startAudio = async ({ audioUris, contextUri, offset }: StartAudioArgs) => {
	const cookie = await cookies()

	const deviceId = cookie.get(COOKIE_KEYS.DEVICE_ID)?.value

	if (!deviceId) {
		throw new Error('Cookie has no device id. Use server action rememberDevice')
	}

	await spotifyClient.player.play({
		audioUris, contextUri, offset, deviceId
	})
}