// lib/services/tmdb.ts
import { env } from '@/env';
import {
	MovieDetails,
	MovieResponse,
	MovieWatchProvidersResponse,
	WatchProvider,
} from '@/lib/types/movie';

const defaultHeaders = {
	accept: 'application/json',
	Authorization: `Bearer ${env.TMDB_API_KEY}`,
};

async function fetchFromTMDB<T>(
	endpoint: string,
	revalidate?: number,
	tags?: string[],
): Promise<T | null> {
	try {
		const url = `${env.TMDB_BASE_URL}${endpoint}`;

		const response = await fetch(url, {
			headers: defaultHeaders,
			next: {
				...(revalidate !== undefined && { revalidate }),
				...(tags?.length && { tags }),
			},
		});

		if (!response.ok) {
			console.error(`TMDB error [${url}]:`, await response.text());
			return null;
		}

		return response.json() as Promise<T>;
	} catch (error) {
		console.error('TMDB fetch error:', error);
		return null;
	}
}

export async function getPopularMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/popular?language=pt-BR&page=${page}`,
		3600,
		['popular-movies'],
	);
}

export async function getTopRatedMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/top_rated?language=pt-BR&page=${page}`,
		86400,
		['top-rated-movies'],
	);
}

export async function getNowPlayingMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/now_playing?language=pt-BR&region=BR&page=${page}`,
		1800,
		['now-playing-movies'],
	);
}

export async function getMovieDetails(
	movieId: number,
): Promise<MovieDetails | null> {
	return fetchFromTMDB<MovieDetails>(`/movie/${movieId}?language=pt-BR`, 3600, [
		`movie-${movieId}`,
	]);
}

export async function getMovieWatchProviders(
	movieId: number,
): Promise<MovieWatchProvidersResponse | null> {
	return fetchFromTMDB<MovieWatchProvidersResponse>(
		`/movie/${movieId}/watch/providers`,
		3600,
		[`movie-providers-${movieId}`],
	);
}

export async function searchMovies(
	query: string,
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/search/movie?language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`,
		60,
	);
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
