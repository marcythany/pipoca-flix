'use server';

import { MovieCard } from '@/components/MovieCard';
import { SectionTitle } from '@/components/SectionTitle';
import { searchMovies } from '@/lib/services/tmdb';

interface SearchResultsProps {
	query: string;
}

export async function SearchResults({ query }: SearchResultsProps) {
	const data = await searchMovies(query);
	const movies = data?.results ?? [];
	const totalResults = data?.total_results ?? 0;

	if (!query) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-400'>Digite um termo para buscar filmes.</p>
			</div>
		);
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
