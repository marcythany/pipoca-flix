import { MovieCard } from '@/components/MovieCard';
import { getNowPlayingMovies } from '@/lib/services/tmdb';

export async function NowPlayingMovies() {
	const data = await getNowPlayingMovies();
	const movies = data?.results.slice(0, 12) ?? [];
	return (
		<>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</>
	);
}
