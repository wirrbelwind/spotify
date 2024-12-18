'use client'

import SpotifyWebPlayer from "react-spotify-web-playback"

interface PlayerProps {
	accessToken: string
}

export const Player: React.FC<PlayerProps> = ({ accessToken }) => {


	return (
		<div>
			<SpotifyWebPlayer
  token={accessToken}
  uris={['spotify:track:5jzNHB2WQ0snL9E9XGcfoT']}
/>;
			{/* <p>{accessToken}</p> */}
		</div>
	)
}