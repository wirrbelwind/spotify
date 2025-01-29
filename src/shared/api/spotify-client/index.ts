import { checkUsersSavedTracks } from "./requests/check-user-saved-tracks";
import { getCurrentUserPlaylists } from "./requests/get-current-user-playlists";
import { getCurrentUserProfile } from "./requests/get-current-user-profile";
import { getCurrentUserTopTracks } from "./requests/get-current-user-top-tracks";
import { getPlaylist } from "./requests/get-playlist";
import { getRecommendations } from "./requests/get-recommendations";
import { getTokensByCode } from "./requests/get-tokens-by-code";
import { play } from "./requests/player/play";
import { shuffle } from "./requests/player/shuffle";
import { refreshTokens } from "./requests/refresh-tokens";
import { saveTracksForCurrentUser } from "./requests/save-tracks-for-current-user";

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
