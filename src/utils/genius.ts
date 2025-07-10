import { getLyrics } from 'genius-lyrics-api';

interface GeniusSong {
	id: number;
	title: string;
	primary_artist: {
		name: string;
		id: number;
	};
	url: string;
}

interface GeniusSearchResult {
	meta: {
		status: number;
	};
	response: {
		hits: Array<{
			result: GeniusSong;
		}>;
	};
}

export async function fetchGeniusSongInfo(
	accessToken: string,
	songTitle: string,
	artistName: string,
): Promise<GeniusSearchResult> {
	const url = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}%20${encodeURIComponent(artistName)}`;
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});

	if (!response.ok) {
		alert('Failed to load song from Genius');
		throw new Error('Failed to load song from Genius: ' + response.status + ' ' + response.statusText);
	}

	const data: GeniusSearchResult = await response.json();

	return data;
}

export async function fetchGeniusSongLyrics(
	accessToken: string,
	songTitle: string,
	artistName: string,
): Promise<string> {
	const options = {
		apiKey: accessToken,
		title: songTitle,
		artist: artistName,
		optimizeQuery: true,
	};

	const lyrics: string | null = await getLyrics(options);
	if (!lyrics) {
		alert('Failed to fetch lyrics from Genius');
		throw new Error('Failed to fetch lyrics from Genius');
	}
	console.log('Genius lyrics fetched successfully:', lyrics);
	return lyrics;
}
