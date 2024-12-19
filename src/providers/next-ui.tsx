'use client'
import { NextUIProvider as NextUIProviderLibrary } from '@nextui-org/react'

import React, { PropsWithChildren } from "react"

export const NextUIProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<NextUIProviderLibrary>
			{children}
		</NextUIProviderLibrary>
	)
}