'use server'

import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../../constants"

export const rememberDeviceId = async (deviceId: string) => {
	const cookie = await cookies()
	
	cookie.set(COOKIE_KEYS.DEVICE_ID, deviceId)
}
