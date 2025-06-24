import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export function generateRandomString(length: number) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

export const server = {
	spotifyAuth: defineAction({
		handler: async () => {
			const clientID = import.meta.env.SPOTIFY_CLIENT_ID;
			console.log('clientID: ' + clientID);
			const redirectURI = 'https://github.com/Chanadu'; // Adjust as needed

			const scope = 'user-read-private user-read-email';
			const authUrl = new URL('https://accounts.spotify.com/authorize');
			const state = generateRandomString(16);

			const params = {
				response_type: 'code',
				client_id: clientID,
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
			const clientID = import.meta.env.SPOTIFY_CLIENT_ID;
			const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

			const authString = `${clientID}:${clientSecret}`;
			const AuthString = new TextEncoder().encode(authString);

			const response = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: 'Basic ' + AuthString,
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: 'github.com/Chanadu', // Adjust as needed
				}),
			});

			return response.json();
		},
	}),
};
