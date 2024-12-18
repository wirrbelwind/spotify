'use client'

import { useEffect, useMemo } from "react"
// import SpotifyWebPlayer from "react-spotify-web-playback"
import './spotify-player'

interface PlayerProps {
	accessToken: string
}

export const Player: React.FC<PlayerProps> = ({ accessToken }) => {
	useEffect(() => {
	window.onSpotifyWebPlaybackSDKReady = () => {
		console.log(window.Spotify)
		const token = accessToken;
		const player = new window.Spotify.Player({
			name: 'Web Playback SDK Quick Start Player',
			getOAuthToken: cb => { cb(token); },
			volume: 0.5
		});

		// Ready
		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
		});

		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline', device_id);
		});

		player.addListener('initialization_error', ({ message }) => {
			console.error(message);
		});

		player.addListener('authentication_error', ({ message }) => {
			console.error(message);
		});

		player.addListener('account_error', ({ message }) => {
			console.error(message);
		});

		document.getElementById('togglePlay').onclick = function () {
			console.log(player)
			player.togglePlay();
		};

		player.connect();
	}

		
	}, [])

	return (
		<div>
			{/* <SpotifyWebPlayer
  token={accessToken}
  uris={['spotify:track:5jzNHB2WQ0snL9E9XGcfoT']}
/>; */}
			{/* <p>{accessToken}</p> */}
			<h1>Spotify Web Playback SDK Quick Start</h1>
			<button id="togglePlay">Toggle Play</button>

		</div>
	)
}
