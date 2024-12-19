import { cookies } from "next/headers"
import { COOKIE_KEYS } from "./constants"

export const authService = async () => {
	const cookie = await cookies()

	return {
		get tokens() {
			return {
				get accessToken() {
					return cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value ?? null
				},
				set accessToken(value: string | null) {
					if (typeof value === 'string') {
						cookie.set(COOKIE_KEYS.ACCESS_TOKEN, value)
						return
					}
					if (value === null) {
						cookie.delete(COOKIE_KEYS.ACCESS_TOKEN)
						return
					}

					throw new Error(`Not valid value in "auth() -> set accessToken()"`)
				},
				get accessTokenExpiresAt() {
					const token = cookie.get(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)?.value

					if (token) {
						return Number(token)
					}
					else {
						return null
					}
				},
				set accessTokenExpiresAt(value: number | null) {
					const isValidValue = typeof value === 'string' || typeof value === 'number'

					if (isValidValue) {
						cookie.set(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT, value.toString())
						return
					}
					if (value === null) {
						cookie.delete(COOKIE_KEYS.ACCESS_TOKEN_EXPIRES_AT)
						return
					}

					throw new Error(`Not valid value in "auth() -> set accessTokenExpiresAt()"`)
				},
				get refreshToken() {
					return cookie.get(COOKIE_KEYS.REFRESH_TOKEN)?.value ?? null
				},
				set refreshToken(value: string | null) {
					if (typeof value === 'string') {
						cookie.set(COOKIE_KEYS.REFRESH_TOKEN, value)
						return
					}
					if (typeof value === null) {
						cookie.delete(COOKIE_KEYS.REFRESH_TOKEN)
						return
					}
					throw new Error(`Not valid value in "auth() -> set refreshToken()"`)
				},
				get isValidTokenData() {
					if (this.accessToken
						&&
						this.refreshToken
						&&
						this.accessTokenExpiresAt
						&&
						!isNaN(this.accessTokenExpiresAt)) {
						return true
					}
					return false
				}
			}
		},

		get process() {
			return {
				get state() {
					return cookie.get(COOKIE_KEYS.STATE)?.value ?? null
				},
				set state(value: string | null) {
					if (typeof value === 'string') {
						cookie.set(COOKIE_KEYS.STATE, value)
						return
					}
					if (typeof value === null) {
						cookie.delete(COOKIE_KEYS.STATE)
						return
					}
					throw new Error(`Not valid value in "auth() -> set state()"`)
				},
				get targetPageAfterLogin() {
					return cookie.get(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)?.value ?? null
				},
				set targetPageAfterLogin(value) {
					if (typeof value === 'string') {
						cookie.set(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN, value)
						return
					}
					if (typeof value === null) {
						cookie.delete(COOKIE_KEYS.TARGET_PAGE_AFTER_LOGIN)
						return
					}
					throw new Error(`Not valid value in "auth() -> set targetPageAfterLogin()"`)
				}
			}
		}
	}
}
