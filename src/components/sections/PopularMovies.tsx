import { MovieCard } from '@/components/MovieCard';
import { getPopularMovies } from '@/lib/services/tmdb';

export async function PopularMovies() {
	const data = await getPopularMovies();
	const movies = data?.results.slice(0, 12) ?? [];
	return (
		<>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</>
	);
}
