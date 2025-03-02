

import { PropsWithChildren } from 'react'
import { HeroUIProvider } from './next-ui';
import { TanstackQueryProvider } from './tanstack-query';
import { SpotifyPlayerProvider } from './spotify-player';
import { authenticationActions } from '@/entities/user';
// import { ContextMenuProvider } from './context-menu';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	return (
		<HeroUIProvider>
			<TanstackQueryProvider>
				<SpotifyPlayerProvider accessToken={
					await authenticationActions.getAccessToken()
				}>
					{/* <ContextMenuProvider> */}
						{children}
					{/* </ContextMenuProvider> */}
				</SpotifyPlayerProvider>
			</TanstackQueryProvider>
		</HeroUIProvider>
	)
}
