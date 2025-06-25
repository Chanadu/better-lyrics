export interface SpotifyUserProfile {
	country: string;
	display_name: string;
	email: string;
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string | null;
		total: number;
	};
	href: string;
	id: string;
	images: Array<{
		height: number | null;
		url: string;
		width: number | null;
	}>;
	product: string;
	type: string;
	uri: string;
}

export async function fetchCurrentUserProfile(accessToken: string): Promise<SpotifyUserProfile> {
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	const profileData: SpotifyUserProfile = await response.json();
	if (!response.ok) {
		throw new Error(`Error fetching user profile: ${response.status} ${response.statusText}`);
	}

	return profileData as SpotifyUserProfile;
}
