

import { PropsWithChildren, useCallback } from 'react'
import { NextUIProvider } from './providers/next-ui';
import { SpotifyPlayerProvider } from './providers/spotify-player';
import UserEntity from './entities/user';

export const Providers: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await UserEntity.authService()

	return (
		<NextUIProvider>
			<SpotifyPlayerProvider accessToken={auth.tokens.accessToken}>
				{children}
			</SpotifyPlayerProvider>
		</NextUIProvider>
	)
}