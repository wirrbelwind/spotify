'use client'

import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<NextUIProvider>
			{children}
		</NextUIProvider>
	)
}