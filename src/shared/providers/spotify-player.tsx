'use client'

import { createContext, PropsWithChildren, use, useRef } from "react";

interface PlayerControllerContextValue {
	controller: Spotify.Player | null
	setController: (value: null | Spotify.Player) => void
}

const PlayerControllerContext = createContext<null | PlayerControllerContextValue>(null)


export const SpotifyPlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const playerRef = useRef<Spotify.Player | null>(null)

	const setController = (value: null | Spotify.Player) => {
		playerRef.current = value
	}

	const contextValue: PlayerControllerContextValue = {
		controller: playerRef.current,
		setController
	}

	return (
		<PlayerControllerContext.Provider value={contextValue}>
			{children}
		</PlayerControllerContext.Provider>
	)
}

export const usePlayerController = () => use(PlayerControllerContext)
