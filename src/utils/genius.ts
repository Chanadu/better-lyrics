export async function fetchGeniusSongInfo(accessToken, songTitle: string, artistName: string): Promise<any> {
	const url = ``;
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
	return;
}
