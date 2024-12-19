import { COOKIE_KEYS } from "@/constants"
import { cookies } from "next/headers"

export const auth = async () => {
	const cookie = await cookies()

	return {
		get tokens() {
			return {
				accessToken: cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value,
				accessTokenExpiresAt: cookie.get(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)?.value,
				refreshToken: cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value
			}
		},

		get process() {
			return {
				state: cookie.get(COOKIE_KEYS.STATE)?.value,
				targetPageAfterLogin: cookie.get(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)?.value
			}
		}
	}
}