import { Header } from '@/components/Header';
import { BuscaContent } from '@/components/sections/BuscaContent';
import { MovieGridSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';

export default function BuscaPage() {
	return (
		<main className='min-h-screen bg-zinc-950'>
			<Header />
			<div className='container mx-auto px-4 pt-24 pb-16'>
				<Suspense fallback={<MovieGridSkeleton count={12} />}>
					<BuscaContent />
				</Suspense>
			</div>
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
