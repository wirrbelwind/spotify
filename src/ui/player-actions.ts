'use server'

import { $axios } from "@/utils/$axios";

export const playCarlyRaeJepsen = async (formData: FormData) => {
	const deviceId = formData.get('device-id')

	$axios.put(
		`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
		{
			uris: ['spotify:track:7xGfFoTpQ2E7fRF5lN10tr']
		}, {
		headers: {
			"Content-Type": "application/json",
		},
	}
	);
};