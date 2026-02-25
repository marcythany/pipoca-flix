import { MovieCard } from '@/components/MovieCard';
import { getTopRatedMovies } from '@/lib/services/tmdb';

export async function TopRatedMovies() {
	const data = await getTopRatedMovies();
	const movies = data?.results.slice(0, 12) ?? [];
	return (
		<>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</>
	);
}
