import { Movie } from '@/lib/types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
	movies: Movie[];
	isNowPlaying?: boolean;
}

export function MovieGrid({ movies, isNowPlaying }: MovieGridProps) {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
			{movies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} isNowPlaying={isNowPlaying} />
			))}
		</div>
	);
}
