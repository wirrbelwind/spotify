export const COOKIE_KEYS = {
	ACCESS_TOKEN: 'spotify-api:access-token',
	ACCESS_TOKEN_EXPIRES_AT: 'spotify-api:access-token-expires-at',
	REFRESH_TOKEN: 'spotify-api:refresh-token',
	STATE: 'spotify-api:state',
	TARGET_PAGE_AFTER_LOGIN: 'target-page-after-login'
} as const

export const ACCESS_SCOPES = `ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private`
