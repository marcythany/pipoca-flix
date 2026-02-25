import { Header } from '@/components/Header';
import { MovieDetailsClient } from '@/components/MovieDetailsClient';
import {
	getMovieDetails,
	getMovieWatchProviders,
	getProvidersByCountry,
} from '@/lib/services/tmdb';
import { notFound } from 'next/navigation';

interface MoviePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function MoviePage({ params }: MoviePageProps) {
	const { id } = await params;
	const movieId = parseInt(id);

	// Busca os dados usando as funções do serviço
	const movie = await getMovieDetails(movieId);
	const providersData = await getMovieWatchProviders(movieId);
	const providers = getProvidersByCountry(providersData, 'BR');

	if (!movie) {
		notFound();
	}

	return (
		<main className='min-h-screen'>
			<Header />
			<MovieDetailsClient movie={movie} providers={providers} />
		</main>
	);
}
