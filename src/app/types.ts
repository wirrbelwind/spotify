export type Nullable<T> = T | null

// TODO:
export interface Entity {
	id: string
	type: string
}
export interface SimplifiedArtistObject extends Entity {
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	name: string
	type: 'artist'
	uri: string
}

export interface ArtistObject extends SimplifiedArtistObject {
	followers: {
		href?: string
		total: number
	}
	genres: string[]

	images: ImageObject[]
	popularity: number
}

export interface ImageObject {
	url: string
	height: Nullable<number>
	width: Nullable<number>
}

export interface AlbumObject extends Entity {
	album_type: "album" | "single" | "compilation"
	total_tracks: number
	available_markets: string[]
	external_urls: {
		spotify: string
	}
	href: string
	images: ImageObject[]
	name: string
	release_date: string
	release_date_precision: string
	restrictions?: {
		reason: 'market' | 'product' | 'explicit'
	}
	type: 'album'
	uri: string
	artists: SimplifiedArtistObject[]
	// TODO: track types
	tracks: []
	copyrights: CopyrightObject[]
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	/** @deprecated The array is always empty */
	genres: []
	label: string
	popularity: number
}

export interface CopyrightObject {
	text: string
	type: 'C' | 'P'
}

export interface PageObject<T> {
	href: string
	limit: number
	next: Nullable<string>
	offset: number
	previous: Nullable<string>
	total: number
	items: T[]
}

export interface User extends Entity{
	/** 
	 * @description 
	 * The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code. This field is only available when the current user has granted access to the user-read-private scope.
	 */
	country: string
	/**
	 * @description 
	 * The name displayed on the user's profile. null if not available.
	 */
	display_name: Nullable<string>
	/** @description
	 * The user's email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.
	 */
	email: string
	/** @description
	 * The user's explicit content settings. This field is only available when the current user has granted access to the user-read-private scope.
	 */
	explicit_content: {
		filter_enabled: boolean
		filter_locked: boolean
	}
	followers: {
		/** @description
		 * This will always be set to null, as the Web API does not support it at the moment.
		 */
		href: Nullable<string>
		total: number
	}
	href: string
	images: ImageObject[]
	/** @description
	 * The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) This field is only available when the current user has granted access to the user-read-private scope.
	 */
	product: 'premium' | 'free' | 'open'
	type: 'user'
	uri: string
}

export interface TrackObject extends Entity{
	album: AlbumObject
	artists: SimplifiedArtistObject[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	external_urls: {
		spotify: string
	}
	href: string
	is_playable: boolean
	linked_from: unknown
	restrictions: {
		reason: 'market' | 'product' | 'explicit' | unknown
	}
	name: string
	popularity: number
	/** @deprecated  */
	preview_url: Nullable<string>
	track_number: number
	type: 'track'
	uri: string
	is_local: boolean
}

export interface SavedTrackObject {
	added_at: string
	track: TrackObject
}

export interface AudioFeaturesObject extends Entity{
	acousticness: number
	analysis_url: string
	danceability: number
	duration_ms: number
	energy: number
	instrumentalness: number
	key: number
	liveness: number
	loudness: number
	mode: number
	speechiness: number
	tempo: number
	time_signature: number
	track_href: string
	type: 'audio_features'
	uri: string
	valence: number
}

export interface SimplifiedPlaylistObject extends Entity{
	collaborative: boolean
	description: Nullable<string>
	external_urls: {
		spotify: string
	}
	href: string
	images: ImageObject[]
	name: string
	owner: User
	public: Nullable<boolean>
	snapshot_id: string
	tracks: PageObject<TrackObject>
	uri: string
}

export interface PlaylistObject extends SimplifiedPlaylistObject {
	followers: {
		href?: string
		total: number
	}
}

export interface SearchObject {
	tracks: PageObject<TrackObject>
	artists: PageObject<ArtistObject>
	albums: PageObject<AlbumObject>
	playlists: PageObject<PlaylistObject>
	// shows: PageObject<ShowObject>
	// episodes: PageObject<EpisodeObject>
	// audiobooks: PageObject<AudioBookObject>
}