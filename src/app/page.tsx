import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MovieCard } from '@/components/MovieCard';
import { SectionTitle } from '@/components/SectionTitle';
import {
	getMovieDetails,
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
} from '@/lib/services/tmdb';

export default async function Home() {
	// Busca os dados das listas
	const popularMovies = await getPopularMovies();
	const topRatedMovies = await getTopRatedMovies();
	const nowPlayingMovies = await getNowPlayingMovies();

	// Para a hero section, vamos usar o primeiro filme em cartaz (se houver)
	// Ou o primeiro popular como fallback
	const heroMovieId =
		nowPlayingMovies?.results[0]?.id || popularMovies?.results[0]?.id;
	const heroMovie = heroMovieId ? await getMovieDetails(heroMovieId) : null;

	return (
		<main className='min-h-screen bg-zinc-950'>
			<Header />

			{/* Hero Section - Dinâmica e chamativa */}
			{heroMovie && <HeroSection movie={heroMovie} />}

			{/* Seções de filmes com layout melhorado */}
			<div className='space-y-16 pb-16'>
				{/* Em Cartaz */}
				<section id='now-playing' className='container mx-auto px-4'>
					<SectionTitle
						icon='🎬'
						title='Em Cartaz nos Cinemas'
						subtitle='Os lançamentos da semana'
					/>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
						{nowPlayingMovies?.results.slice(0, 12).map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>
				</section>

				{/* Mais Populares */}
				<section id='popular' className='container mx-auto px-4'>
					<SectionTitle
						icon='🔥'
						title='Mais Pesquisados'
						subtitle='Os favoritos da galera'
					/>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
						{popularMovies?.results.slice(0, 12).map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>
				</section>

				{/* Mais Bem Avaliados */}
				<section id='top-rated' className='container mx-auto px-4'>
					<SectionTitle
						icon='⭐'
						title='Mais Bem Avaliados'
						subtitle='O que a crítica e o público amam'
					/>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
						{topRatedMovies?.results.slice(0, 12).map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</div>
				</section>
			</div>

			{/* Footer simples com efeito glass */}
			<footer className='border-t border-white/10 bg-black/30 backdrop-blur-md py-8'>
				<div className='container mx-auto px-4 text-center text-sm text-gray-400'>
					<p>© 2026 Pipoca Flix. Todos os direitos reservados.</p>
					<p className='mt-2'>
						Dados fornecidos por{' '}
						<a
							href='https://www.themoviedb.org/'
							target='_blank'
							rel='noopener noreferrer'
							className='text-red-400 hover:text-red-300 transition-colors'
						>
							TMDB
						</a>
					</p>
				</div>
			</footer>
		</main>
	);
}
