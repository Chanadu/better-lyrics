import { SpotifyApi } from '@spotify/web-api-ts-sdk';

async function getProfile(token: string): Promise<Error | Object> {
	const response = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new Error(`Error fetching profile: ${response.statusText}`);
	}

	return response.json();
}
