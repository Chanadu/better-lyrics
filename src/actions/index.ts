import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from 'astro:env/server';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export function generateRandomString(length: number) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

// ...existing code...
export const server = {
	printEnv: defineAction({
		handler: async () => {
			return {
				SPOTIFY_CLIENT_ID: SPOTIFY_CLIENT_ID,
				SPOTIFY_CLIENT_SECRET: SPOTIFY_CLIENT_SECRET,
			};
		},
	}),
	spotifyAuth: defineAction({
		handler: async () => {
			console.log('clientID: ' + SPOTIFY_CLIENT_ID);
			var redirectURI = 'http://127.0.0.1:4321/callback';

			const scope = 'user-read-private user-read-email';
			const authUrl = new URL('https://accounts.spotify.com/authorize');
			const state = generateRandomString(16);

			const params = {
				response_type: 'code',
				client_id: SPOTIFY_CLIENT_ID,
				scope: scope,
				redirect_uri: redirectURI,
				state: state,
			};

			authUrl.search = new URLSearchParams(params).toString();
			return { url: authUrl.toString(), state };
		},
	}),
	askAuthToken: defineAction({
		input: z.object({
			code: z.string(),
		}),
		handler: async ({ code }) => {
			const redirectURI = 'http://127.0.0.1:4321/callback'; // Make sure this matches above

			const authString = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;

			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + btoa(authString),
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: redirectURI, // Must match above
				}),
			});

			return response.json();
		},
	}),
};
