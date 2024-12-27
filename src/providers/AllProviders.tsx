

import { PropsWithChildren } from 'react'
import { NextUIProvider } from './next-ui';
import { SpotifyPlayerProvider } from './react-spotify-web-playback-sdk';
import UserEntity from '@/entities/user';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await UserEntity.authService()

	return (
		<NextUIProvider>
			<SpotifyPlayerProvider accessToken={auth.tokens.accessToken}>
				{children}
			</SpotifyPlayerProvider>
		</NextUIProvider>
	)
}