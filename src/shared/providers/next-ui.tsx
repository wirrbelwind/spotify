'use client'
import { HeroUIProvider as HeroUIProviderLibrary } from "@heroui/react"

import React, { PropsWithChildren } from "react"

export const HeroUIProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<HeroUIProviderLibrary>
			{children}
		</HeroUIProviderLibrary>
	)
}