'use server'

import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../constants"
/**
 * 
 * @description Writes device id to cookies. This id is needed for further server actions with player.
 */
export const rememberDevice = async (deviceId: string) => {
	const cookie = await cookies()

	cookie.set(COOKIE_KEYS.DEVICE_ID, deviceId)
}
