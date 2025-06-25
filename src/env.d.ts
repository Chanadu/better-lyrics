interface ImportMetaEnv {
	readonly SPOTIFY_CLIENT_ID: string;
	readonly SPOTIFY_CLIENT_SECRET: string;
	readonly REDIRECT_URI: string;
	readonly GENIUS_CLIENT_ID: string;
	readonly GENIUS_CLIENT_SECRET: string;
	readonly GENIUS_CLIENT_ACCESS_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
