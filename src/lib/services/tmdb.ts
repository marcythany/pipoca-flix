import { env } from '@/env';
import {
	MovieDetails,
	MovieResponse,
	MovieWatchProvidersResponse,
	WatchProvider,
} from '@/lib/types/movie';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${env.TMDB_API_KEY}`,
	},
};

// Função genérica para buscar dados da API COM RATE LIMITING
async function fetchFromTMDB<T>(endpoint: string): Promise<T | null> {
	try {
		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}${endpoint}`;
		const response = await fetch(url, options);

		if (response.status === 429) {
			console.warn('Rate limit atingido. Aguardando...');
			const retryAfter = response.headers.get('Retry-After');
			if (retryAfter) {
				const waitTime = parseInt(retryAfter) * 1000;
				await new Promise((resolve) => setTimeout(resolve, waitTime));
				return fetchFromTMDB(endpoint);
			}
			return null;
		}

		if (!response.ok) {
			throw new Error(`Erro na API TMDB: ${response.statusText}`);
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		console.error('Falha na requisição ao TMDB:', error);
		return null;
	}
}

export async function getPopularMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/popular?language=pt-BR&page=${page}`,
	);
}

export async function getTopRatedMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/top_rated?language=pt-BR&page=${page}`,
	);
}

export async function getNowPlayingMovies(
	page = 1,
): Promise<MovieResponse | null> {
	return fetchFromTMDB<MovieResponse>(
		`/movie/now_playing?language=pt-BR&region=BR&page=${page}`,
	);
}

export async function getMovieWatchProviders(
	movieId: number,
): Promise<MovieWatchProvidersResponse | null> {
	return fetchFromTMDB<MovieWatchProvidersResponse>(
		`/movie/${movieId}/watch/providers`,
	);
}

export async function getMovieDetails(
	movieId: number,
): Promise<MovieDetails | null> {
	return fetchFromTMDB<MovieDetails>(
		`/movie/${movieId}?language=pt-BR&append_to_response=credits,videos`,
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

	// Tenta pegar do país solicitado (BR), se não existir, tenta US
	const countryData = data.results[countryCode] || data.results['US'];

	if (!countryData) return null;

	return {
		flatrate: countryData.flatrate,
		buy: countryData.buy,
		rent: countryData.rent,
		link: countryData.link,
	};
}
