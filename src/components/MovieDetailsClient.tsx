'use client';

import { MovieDetails, WatchProvider } from '@/lib/types/movie';
import { formatReleaseYear } from '@/lib/utils/date';
import * as React from 'react';
import { MovieImage } from './MovieImage';
import { WatchProviders } from './WatchProviders';

interface MovieDetailsClientProps {
	paramsPromise: Promise<{ id: string }>;
}

export function MovieDetailsClient({ paramsPromise }: MovieDetailsClientProps) {
	// Desembrulha a Promise de forma segura (React.use é o equivalente a `await` em Client Components)
	const { id } = React.use(paramsPromise);

	const [movie, setMovie] = React.useState<MovieDetails | null>(null);
	const [providers, setProviders] = React.useState<{
		flatrate?: WatchProvider[];
		buy?: WatchProvider[];
		rent?: WatchProvider[];
		link?: string;
	} | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				// Busca detalhes do filme
				const movieRes = await fetch(`/api/movie/${id}/details`);
				if (!movieRes.ok) throw new Error('Erro ao carregar filme');
				const movieData = await movieRes.json();
				setMovie(movieData);

				// Busca provedores de streaming
				const providersRes = await fetch(`/api/movie/${id}/providers`);
				if (providersRes.ok) {
					const providersData = await providersRes.json();
					setProviders(providersData);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Erro desconhecido');
			} finally {
				setLoading(false);
			}
		}

		if (id) {
			fetchData();
		}
	}, [id]);

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white'></div>
			</div>
		);
	}

	if (error || !movie) {
		return (
			<div className='flex justify-center items-center min-h-screen text-red-500'>
				{error || 'Filme não encontrado'}
			</div>
		);
	}

	const director = movie.credits?.crew?.find(
		(person) => person.job === 'Director',
	);

	const cast = movie.credits?.cast?.slice(0, 5) || [];

	const trailer = movie.videos?.results?.find(
		(video) => video.type === 'Trailer' && video.site === 'YouTube',
	);

	const releaseYear = formatReleaseYear(movie.release_date);

	// O restante do JSX permanece IGUAL ao que você já tem, usando `movie` e `providers`
	return (
		<>
			<section className='relative h-[60vh] w-full'>
				{movie.backdrop_path && (
					<>
						<MovieImage
							src={movie.backdrop_path}
							alt={movie.title}
							type='backdrop'
							priority
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent' />
						<div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent' />
					</>
				)}

				<div className='relative container mx-auto h-full flex items-end px-4 pb-12'>
					<div className='flex gap-6 items-end'>
						<div className='hidden md:block relative w-64 aspect-[2/3] rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl'>
							<MovieImage
								src={movie.poster_path}
								alt={movie.title}
								type='poster'
								className='object-cover'
							/>
						</div>

						<div className='flex-1'>
							<h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
								{movie.title}
							</h1>
							<p className='text-xl text-gray-300 mb-4'>{movie.tagline}</p>

							<div className='flex flex-wrap gap-4 text-sm text-gray-300 mb-4'>
								<span>{releaseYear}</span>
								<span className='flex items-center gap-1'>
									⭐ {movie.vote_average?.toFixed(1) ?? '?'}
								</span>
								<span>{movie.runtime} min</span>
							</div>

							{trailer && (
								<a
									href={`https://youtube.com/watch?v=${trailer.key}`}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors'
								>
									▶ Assistir Trailer
								</a>
							)}
						</div>
					</div>
				</div>
			</section>

			<section className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-2'>
						<div className='mb-8'>
							<h2 className='text-xl font-semibold mb-3'>Sinopse</h2>
							<p className='text-gray-300 leading-relaxed'>{movie.overview}</p>
						</div>

						{cast.length > 0 && (
							<div className='mb-8'>
								<h2 className='text-xl font-semibold mb-3'>Elenco principal</h2>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
									{cast.map((actor) => (
										<div key={actor.id} className='text-center'>
											<div className='relative w-full aspect-square rounded-full overflow-hidden mb-2 border-2 border-white/10'>
												<MovieImage
													src={actor.profile_path}
													alt={actor.name}
													type='profile'
													className='object-cover'
												/>
											</div>
											<p className='text-sm font-medium'>{actor.name}</p>
											<p className='text-xs text-gray-400'>{actor.character}</p>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<div className='lg:col-span-1'>
						<WatchProviders providers={providers} movieTitle={movie.title} />

						<div className='mt-6 p-4 bg-zinc-900/50 backdrop-blur-md rounded-lg border border-white/10'>
							<h3 className='text-lg font-semibold mb-3'>Ficha técnica</h3>
							<dl className='space-y-2 text-sm'>
								{director && (
									<>
										<dt className='text-gray-400'>Direção</dt>
										<dd className='text-white mb-2'>{director.name}</dd>
									</>
								)}
								<dt className='text-gray-400'>Gêneros</dt>
								<dd className='text-white mb-2'>
									{movie.genres?.map((g) => g.name).join(', ')}
								</dd>
								<dt className='text-gray-400'>Idioma original</dt>
								<dd className='text-white mb-2'>
									{movie.original_language === 'pt' ?
										'Português'
									: movie.original_language === 'en' ?
										'Inglês'
									:	movie.original_language}
								</dd>
								<dt className='text-gray-400'>Orçamento</dt>
								<dd className='text-white mb-2'>
									{movie.budget > 0 ?
										new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'USD',
										}).format(movie.budget)
									:	'Não disponível'}
								</dd>
								<dt className='text-gray-400'>Receita</dt>
								<dd className='text-white'>
									{movie.revenue > 0 ?
										new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'USD',
										}).format(movie.revenue)
									:	'Não disponível'}
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
