import { Header } from '@/components/Header';
import { HeroMovie } from '@/components/sections/HeroMovie';
import { NowPlayingMovies } from '@/components/sections/NowPlayingMovies';
import { PopularMovies } from '@/components/sections/PopularMovies';
import { TopRatedMovies } from '@/components/sections/TopRatedMovies';
import { SectionTitle } from '@/components/SectionTitle';
import { HeroSectionSkeleton, MovieGridSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className='min-h-screen bg-zinc-950'>
			<Header />

			{/* Hero Section com Suspense */}
			<Suspense fallback={<HeroSectionSkeleton />}>
				<HeroMovie />
			</Suspense>

			<div className='space-y-16 pb-16'>
				{/* Em Cartaz */}
				<section id='now-playing' className='container mx-auto px-4'>
					<SectionTitle
						icon='🎬'
						title='Em Cartaz nos Cinemas'
						subtitle='Os lançamentos da semana'
					/>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
						<Suspense fallback={<MovieGridSkeleton count={12} />}>
							<NowPlayingMovies />
						</Suspense>
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
						<Suspense fallback={<MovieGridSkeleton count={12} />}>
							<PopularMovies />
						</Suspense>
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
						<Suspense fallback={<MovieGridSkeleton count={12} />}>
							<TopRatedMovies />
						</Suspense>
					</div>
				</section>
			</div>

			{/* Footer */}
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
