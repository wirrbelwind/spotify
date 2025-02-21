

import { PropsWithChildren } from 'react'
import { HeroUIProvider } from './next-ui';
import { TanstackQueryProvider } from './tanstack-query';
import { SpotifyPlayerProvider } from './spotify-player';
import { authService } from '@/entities/user';
// import { ContextMenuProvider } from './context-menu';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await authService()
	
	return (
		<HeroUIProvider>
			<TanstackQueryProvider>
				<SpotifyPlayerProvider accessToken={auth.tokens.accessToken}>
					{/* <ContextMenuProvider> */}
						{children}
					{/* </ContextMenuProvider> */}
				</SpotifyPlayerProvider>
			</TanstackQueryProvider>
		</HeroUIProvider>
	)
}
