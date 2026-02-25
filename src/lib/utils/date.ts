export function formatReleaseYear(dateString?: string | null): string {
	if (!dateString) return '?';
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return '?';
	return date.getFullYear().toString();
}
