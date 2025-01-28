import { checkUsersSavedTracks } from "./spotify-client/requests/check-user-saved-tracks";
import { getCurrentUserPlaylists } from "./spotify-client/requests/get-current-user-playlists";
import { getCurrentUserProfile } from "./spotify-client/requests/get-current-user-profile";
import { getCurrentUserTopTracks } from "./spotify-client/requests/get-current-user-top-tracks";
import { getPlaylist } from "./spotify-client/requests/get-playlist";
import { getRecommendations } from "./spotify-client/requests/get-recommendations";
import { getTokensByCode } from "./spotify-client/requests/get-tokens-by-code";
import { refreshTokens } from "./spotify-client/requests/refresh-tokens";

export const spotifyClient = {
	checkUsersSavedTracks,
	getCurrentUserPlaylists,
	getCurrentUserProfile,
	getCurrentUserTopTracks,
	getPlaylist,
	getRecommendations,
	getTokensByCode,
	refreshTokens,
}
