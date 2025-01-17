export type Nullable<T> = T | null

// TODO:
export interface Entity {
	/**
	 * @format spotify-id
	 */
	id: string
	type: 'artist' | 'album' | 'user' | 'track' | 'audio_features'
}
export interface SimplifiedArtistObject extends Entity {
	external_urls: {
		/**
		 * @format url
		 */
		spotify: string
	}
	/**
		 * @format url
		 */
	href: string
	/**
		 * @format spotify-id
		 */
	id: string
	name: string
	type: 'artist'
	/**
	 * @format spotify-uri
	 */
	uri: string
}

export interface ArtistObject extends SimplifiedArtistObject {
	followers: {
		/**
		 * @format url
		 */
		href?: string
		/**
		 * @minimum 0
		 */
		total: number
	}
	genres: string[]

	images: ImageObject[]
	/**
	 * @minimum 0
	 * @maximum 100
	 */
	popularity: number
}

export interface ImageObject {
	/**
	 * @format url
	 */
	url: string
	height: Nullable<number>
	width: Nullable<number>
}

export interface AlbumObject extends Entity {
	album_type: "album" | "single" | "compilation"
	/**
	 * @minimum 1
	 */
	total_tracks: number

	/**
	 * @elementFormat country-iso-alpha-2
	 */
	available_markets: string[]
	external_urls: {
		/**
		 * @format url
		 */
		spotify: string
	}
	/**
	 * @format url
	*/
	href: string
	images: ImageObject[]
	name: string
	/**
	 * @format date
	 */
	release_date: string
	release_date_precision:  "year" | "month" | "day"
	restrictions?: {
		reason: 'market' | 'product' | 'explicit'
	}
	type: 'album'
	/**
	 * @format spotify-uri
	 */
	uri: string
	artists: SimplifiedArtistObject[]
	// TODO: track types
	tracks: PageObject<TrackObject>
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

export interface User extends Entity {
	/** 
	 * @description 
	 * The country of the user, as set in the user's account profile. An ISO 3166-1 alpha-2 country code. This field is only available when the current user has granted access to the user-read-private scope.
	 * @format country-iso-alpha-2
	 */
	country: string
	/**
	 * @description 
	 * The name displayed on the user's profile. null if not available.
	 * @minLength 1
	 * @maxLength 32
	 */
	display_name: Nullable<string>
	/** 
	 * @description
	 * The user's email address, as entered by the user when creating their account. Important! This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.
	 * @format email
	 */
	email: string
	/** @description
	 * The user's explicit content settings. This field is only available when the current user has granted access to the user-read-private scope.
	 */
	explicit_content?: {
		filter_enabled: boolean
		filter_locked: boolean
	}
	external_urls: {
		/**
		 * @format url
		 */
		spotify: string
	}
	followers: {
		/** 
		 * @description
		 * This will always be set to null, as the Web API does not support it at the moment.
		 * @format url
		 */
		href: Nullable<string>
		/**
		 * @minimum 0
		 */
		total: number
	}
	/**
	 * @format url
	 */
	href: string
	images: ImageObject[]
	/** @description
	 * The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) This field is only available when the current user has granted access to the user-read-private scope.
	 */
	product: 'premium' | 'free' | 'open'
	type: 'user'
	/**
	 * @format spotify-uri
	 */
	uri: string
}

export interface TrackObject extends Entity {
	album: AlbumObject
	artists: SimplifiedArtistObject[]
	/**
	 * @elementFormat country-iso-alpha-2
	 */
	available_markets: string[]
	/**
	 * @minimum 1
	 */
	disc_number: number
	/**
	 * @minimum 1
	 */
	duration_ms: number
	explicit: boolean
	external_ids: {
		/**
		 * @format isrc
		 */
		isrc: string
		/**
		 * @format ean
		 */
		ean: string
		/**
		 * @format upc
		 */
		upc: string
	}
	external_urls: {
		/**
		 * @format url
		 */
		spotify: string
	}
	/**
	 * format url
	 */
	href: string
	is_playable: boolean
	linked_from: unknown
	restrictions: {
		reason: 'market' | 'product' | 'explicit' | unknown
	}
	/**
	 * @minLength 1
	 */
	name: string
	/**
	 * @minimum 0
	 * @maximum 100
	 */
	popularity: number
	/** @deprecated
	  */
	preview_url: Nullable<string>
	/**
	 * @minimum 1
	 */
	track_number: number
	type: 'track'
	/**
	 * format spotify-uri
	 */
	uri: string
	is_local: boolean
}

export interface SavedTrackObject {
	/**
	 * @format date
	 */
	added_at: string
	track: TrackObject
}

export interface AudioFeaturesObject extends Entity {
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	acousticness: number
	/**
	 * @format url
	 */
	analysis_url: string
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	danceability: number
	/**
	 * @minimum 1
	 */
	duration_ms: number
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	energy: number
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	instrumentalness: number
	/**
	 * @minimum -1
	 * @maximum 11
	 */
	key: number
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	liveness: number
	loudness: number
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	mode: number
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	speechiness: number
	tempo: number
	/**
	 * @minimum 3
	 * @maximum 7
	 */
	time_signature: number
	/**
	 * @format url
	 */
	track_href: string
	type: 'audio_features'
	/**
	 * format spotify-uri
	 */
	uri: string
	/**
	 * @minimum 0
	 * @maximum 1
	 */
	valence: number
}

export interface SimplifiedPlaylistObject extends Entity {
	collaborative: boolean
	description: Nullable<string>
	external_urls: {
		/**
		 * @format url
		 */
		spotify: string
	}
	/**
	 * @format url
	 */
	href: string
	images: ImageObject[]
	name: string
	owner: User
	public: Nullable<boolean>
	snapshot_id: string
	tracks: PageObject<TrackObject>
	/**
	 * format spotify-uri
	 */
	uri: string
}

export interface PlaylistObject extends SimplifiedPlaylistObject {
	followers: {
		/**
		 * @format url
		 */
		href?: string
		/**
		 * @minimum 0
		 */
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