// lib/services/tmdb.ts
import {
	MovieDetails,
	MovieResponse,
	MovieWatchProvidersResponse,
	WatchProvider,
} from '@/lib/types/movie';

async function fetchFromInternalAPI<T>(endpoint: string): Promise<T | null> {
	try {
		// Determina a URL base
		const baseUrl =
			process.env.VERCEL_URL ?
				`https://${process.env.VERCEL_URL}`
			:	process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

		const url = `${baseUrl}${endpoint}`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error('Error response:', await response.text());
			return null;
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}
}

export async function getPopularMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromInternalAPI<MovieResponse>(
		`/api/movies/popular?page=${page}`,
	);
}

export async function getTopRatedMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromInternalAPI<MovieResponse>(
		`/api/movies/top-rated?page=${page}`,
	);
}

export async function getNowPlayingMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromInternalAPI<MovieResponse>(
		`/api/movies/now-playing?page=${page}`,
	);
}

export async function getMovieWatchProviders(
	movieId: number,
): Promise<MovieWatchProvidersResponse | null> {
	return fetchFromInternalAPI<MovieWatchProvidersResponse>(
		`/api/movie/${movieId}/providers`,
	);
}

export async function getMovieDetails(
	movieId: number,
): Promise<MovieDetails | null> {
	return fetchFromInternalAPI<MovieDetails>(`/api/movie/${movieId}/details`);
}

export function getProvidersByCountry(
	data: MovieWatchProvidersResponse | null,
	countryCode: string = 'BR',
): {
	flatrate?: WatchProvider[];
	buy?: WatchProvider[];
	rent?: WatchProvider[];
	link?: string;
} | null {
	if (!data?.results) return null;
	const countryData = data.results[countryCode] || data.results['US'];
	if (!countryData) return null;
	return {
		flatrate: countryData.flatrate,
		buy: countryData.buy,
		rent: countryData.rent,
		link: countryData.link,
	};
}
