'use client';

import { MovieCard } from '@/components/MovieCard';
import { SectionTitle } from '@/components/SectionTitle';
import { MovieGridSkeleton } from '@/components/Skeletons';
import { searchMovies } from '@/lib/services/tmdb';
import { Movie } from '@/lib/types/movie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function BuscaContent() {
	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';
	const [movies, setMovies] = useState<Movie[]>([]);
	const [totalResults, setTotalResults] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!query) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setMovies([]);

			setTotalResults(0);

			setLoading(false);
			return;
		}

		setLoading(true);
		searchMovies(query).then((data) => {
			setMovies(data?.results ?? []);
			setTotalResults(data?.total_results ?? 0);
			setLoading(false);
		});
	}, [query]);

	if (!query) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-400'>Digite um termo para buscar filmes.</p>
			</div>
		);
	}

	if (loading) {
		return <MovieGridSkeleton count={12} />;
	}

	if (movies.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-400'>
					Nenhum filme encontrado para &quot;{query}&quot;.
				</p>
			</div>
		);
	}

	return (
		<>
			<SectionTitle
				icon='🔍'
				title={`Resultados para "${query}"`}
				subtitle={`${totalResults} filmes encontrados`}
			/>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
				{movies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</>
	);
}
