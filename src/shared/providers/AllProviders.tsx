

import { PropsWithChildren } from 'react'
import { NextUIProvider } from './next-ui';
import UserEntity from '@/entities/user';
import { TanstackQueryProvider } from './tanstack-query';
import { SpotifyPlayerProvider } from './spotify-player';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await UserEntity.authService()

	return (
		<NextUIProvider>
			<SpotifyPlayerProvider accessToken={auth.tokens.accessToken}>
				<TanstackQueryProvider>
					{children}
				</TanstackQueryProvider>
			</SpotifyPlayerProvider>
		</NextUIProvider>
	)
}
