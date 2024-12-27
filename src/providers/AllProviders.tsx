

import { PropsWithChildren } from 'react'
import { NextUIProvider } from './next-ui';
import UserEntity from '@/entities/user';

export const AllProviders: React.FC<PropsWithChildren> = async ({ children }) => {
	const auth = await UserEntity.authService()

	return (
		<NextUIProvider>
				{children}
		</NextUIProvider>
	)
}
