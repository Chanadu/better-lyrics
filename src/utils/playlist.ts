interface SpotifyPlaylist {
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
	};
	type: string;
	uri: string;
}

interface SpotifyPlaylistList {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: Array<SpotifyPlaylist>;
}

export async function fetchSpotifyPlaylists() {}
