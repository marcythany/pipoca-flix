import { HeroSection } from '@/components/HeroSection';
import {
	getMovieDetails,
	getNowPlayingMovies,
	getPopularMovies,
} from '@/lib/services/tmdb';

export async function HeroMovie() {
	// Busca filmes em cartaz e populares em paralelo
	const [nowPlaying, popular] = await Promise.all([
		getNowPlayingMovies(),
		getPopularMovies(),
	]);

	// Escolhe o primeiro filme em cartaz ou o primeiro popular como fallback
	const heroMovieId = nowPlaying?.results[0]?.id || popular?.results[0]?.id;
	if (!heroMovieId) return null;

	const heroMovie = await getMovieDetails(heroMovieId);
	if (!heroMovie) return null;

	return <HeroSection movie={heroMovie} />;
}
