

import { PropsWithChildren, useCallback } from 'react'
import { NextUIProvider } from './providers/next-ui';
import { SpotifyPlayerProvider } from './providers/spotify-player';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from './constants';

export const Providers: React.FC<PropsWithChildren> = async ({ children }) => {
	const cookie = await cookies()
	const accessToken = cookie.get(COOKIE_KEYS.ACCESS_TOKEN)?.value

	return (
		<NextUIProvider>
			<SpotifyPlayerProvider accessToken={accessToken}>
				{children}
			</SpotifyPlayerProvider>
		</NextUIProvider>
	)
}