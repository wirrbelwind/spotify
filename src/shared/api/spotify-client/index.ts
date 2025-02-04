import { checkUsersSavedTracks } from "./http-requests/check-user-saved-tracks";
import { getCurrentUserPlaylists } from "./http-requests/get-current-user-playlists";
import { getCurrentUserProfile } from "./http-requests/get-current-user-profile";
import { getCurrentUserTopTracks } from "./http-requests/get-current-user-top-tracks";
import { getPlaylist } from "./http-requests/get-playlist";
import { getRecommendations } from "./http-requests/get-recommendations";
import { getTokensByCode } from "./http-requests/get-tokens-by-code";
import { play } from "./http-requests/player/play";
import { shuffle } from "./http-requests/player/shuffle";
import { refreshTokens } from "./http-requests/refresh-tokens";
import { saveTracksForCurrentUser } from "./http-requests/save-tracks-for-current-user";

export const spotifyClient = {
	checkUsersSavedTracks,
	getCurrentUserPlaylists,
	getCurrentUserProfile,
	getCurrentUserTopTracks,
	getPlaylist,
	getRecommendations,
	getTokensByCode,
	refreshTokens,
	saveTracksForCurrentUser,
	player: {
		play,
		shuffle
	}
}
