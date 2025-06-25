export function getAuthToken() {
	return Astro.session?.get('authToken') : null;
}
