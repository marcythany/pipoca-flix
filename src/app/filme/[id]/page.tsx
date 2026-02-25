// src/app/filme/[id]/page.tsx
import { Header } from '@/components/Header';
import { WatchProviders } from '@/components/WatchProviders';
import { env } from '@/env';
import {
	getMovieDetails,
	getMovieWatchProviders,
	getProvidersByCountry,
} from '@/lib/services/tmdb';
import { Cast, Crew, Video } from '@/lib/types/movie';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface MoviePageProps {
	params: Promise<{
		// 👈 AGORA É UMA PROMISE
		id: string;
	}>;
}

export default async function MoviePage({ params }: MoviePageProps) {
	const { id } = await params; // 👈 DESEMBRULHA A PROMISE COM AWAIT
	const movieId = parseInt(id);

	// Busca os dados usando as funções do serviço
	const movie = await getMovieDetails(movieId);
	const providersData = await getMovieWatchProviders(movieId);
	const providers = getProvidersByCountry(providersData, 'BR');

	if (!movie) {
		notFound();
	}

	// O RESTO DO CÓDIGO PERMANECE IGUAL (a partir daqui é cópia do seu código, sem mudanças)
	const backdropUrl =
		movie.backdrop_path ?
			`${env.TMDB_IMAGE_URL}/original${movie.backdrop_path}`
		:	null;

	const posterUrl =
		movie.poster_path ?
			`${env.TMDB_IMAGE_URL}/w500${movie.poster_path}`
		:	'https://placehold.co/500x750/1f1f1f/666666?text=Sem+Imagem';

	const director = movie.credits?.crew?.find(
		(person: Crew) => person.job === 'Director',
	);

	const cast = movie.credits?.cast?.slice(0, 5) || [];

	const trailer = movie.videos?.results?.find(
		(video: Video) => video.type === 'Trailer' && video.site === 'YouTube',
	);

	return (
		<main className='min-h-screen'>
			<Header />

			<section className='relative h-[60vh] w-full'>
				{backdropUrl && (
					<>
						<Image
							src={backdropUrl}
							alt={movie.title}
							fill
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
							<Image
								src={posterUrl}
								alt={movie.title}
								fill
								className='object-cover'
							/>
						</div>

						<div className='flex-1'>
							<h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
								{movie.title}
							</h1>
							<p className='text-xl text-gray-300 mb-4'>{movie.tagline}</p>

							<div className='flex flex-wrap gap-4 text-sm text-gray-300 mb-4'>
								<span>{new Date(movie.release_date).getFullYear()}</span>
								<span className='flex items-center gap-1'>
									⭐ {movie.vote_average.toFixed(1)}
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
									{cast.map((actor: Cast) => (
										<div key={actor.id} className='text-center'>
											<div className='relative w-full aspect-square rounded-full overflow-hidden mb-2 border-2 border-white/10'>
												{actor.profile_path ?
													<Image
														src={`${env.TMDB_IMAGE_URL}/w185${actor.profile_path}`}
														alt={actor.name}
														fill
														className='object-cover'
													/>
												:	<div className='w-full h-full bg-zinc-800 flex items-center justify-center'>
														<span className='text-2xl'>🎭</span>
													</div>
												}
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
		</main>
	);
}
