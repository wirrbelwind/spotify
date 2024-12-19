'use client'

import React, { PropsWithChildren, useCallback } from "react";
import { WebPlaybackSDK } from "react-spotify-web-playback-sdk";

interface SpotifyPlayerProviderProps extends PropsWithChildren {
	accessToken: string
}

export const SpotifyPlayerProvider: React.FC<SpotifyPlayerProviderProps> = ({ children, accessToken }) => {
	const getOAuthToken = useCallback(callback => {
		callback(accessToken);
	}, []);

	return (
		<WebPlaybackSDK
			initialDeviceName="Pet project"
			getOAuthToken={getOAuthToken}
			initialVolume={0.5}

			connectOnInitialized={true}
		>
			{children}
		</WebPlaybackSDK>
	)
}