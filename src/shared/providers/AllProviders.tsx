

import { PropsWithChildren } from 'react'
import { NextUIProvider } from './next-ui';
import { TanstackQueryProvider } from './tanstack-query';
import { SpotifyPlayerProvider } from './spotify-player';
import { authService } from '@/entities/user';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await authService()

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
