export interface SpotifyArtist {
	id: string;
	name: string;
	external_urls: {
		spotify: string;
	};
	href: string;
}

export interface SpotifyAlbum {
	album_type: string;
	total_tracks: number;
	id: string;
	name: string;
	release_date: string;
	artists: Array<SpotifyArtist>;
}

export interface SpotifyTrack {
	added_at: string;
	is_local: boolean;
	track: {
		album: SpotifyAlbum;
		artists: Array<SpotifyArtist>;
		disc_number: number;
		duration_ms: number;
		id: string;
		name: string;
		track_number: number;
	};
}

export interface SpotifyPlaylist {
	collaborative: boolean;
	description: string | null;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: Array<{
		height: number | null;
		url: string;
		width: number | null;
	}>;
	name: string;
	owner: {
		display_name: string | null;
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
		next: string | null;
		previous: string | null;
		items: Array<SpotifyTrack>;
	};
	type: string;
	uri: string;
}

export interface SpotifyPlaylistList {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: Array<SpotifyPlaylist>;
}

export async function fetchSpotifyPlaylistList(
	accessToken: string,
	limit = 20,
	offset = 0,
): Promise<SpotifyPlaylistList> {
	const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	const data: SpotifyPlaylistList = await response.json();

	if (!response.ok) {
		alert('Failed to fetch playlists: ');
		throw new Error('Failed to fetch playlists: ');
	}
	return data;
}

export async function fetchSpotifyPlaylist(accessToken: string, playlistId: string): Promise<SpotifyPlaylist> {
	const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
	const data: SpotifyPlaylist = await response.json();
	if (!response.ok) {
		alert('Failed to fetch playlist: ');
		throw new Error('Failed to fetch playlist: ');
	}
	return data;
}
