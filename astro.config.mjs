// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},

	adapter: cloudflare({
		platformProxy: {
			enabled: true,
			configPath: './wrangler.json',
		},
	}),
	env: {
		schema: {
			SPOTIFY_CLIENT_ID: envField.string({ context: 'server', access: 'secret' }),
			SPOTIFY_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret' }),
			REDIRECT_URI: envField.string({ context: 'client', access: 'public' }),
		},
	},
});
