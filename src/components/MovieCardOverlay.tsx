'use client';

import { Movie, WatchProvider } from '@/lib/types/movie';
import { ProviderIcon } from './ProviderIcon';

interface MovieCardOverlayProps {
	movie: Movie;
	isNowPlaying: boolean;
	providers: WatchProvider[];
	isLoading: boolean;
	hasError: boolean;
}

export function MovieCardOverlay({
	movie,
	isNowPlaying,
	providers,
	isLoading,
	hasError,
}: MovieCardOverlayProps) {
	return (
		<div className='absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 backdrop-blur-[2px]'>
			<h3 className='text-sm font-bold text-white line-clamp-2 drop-shadow-lg'>
				{movie.title}
			</h3>
			<div className='flex items-center gap-2 mt-1 text-xs text-gray-300'>
				<span>{new Date(movie.release_date).getFullYear()}</span>
				<span className='flex items-center gap-1'>
					⭐ {movie.vote_average.toFixed(1)}
				</span>
			</div>

			<div className='mt-3 min-h-8'>
				{isNowPlaying ?
					<span className='inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-yellow-300 bg-yellow-500/20 backdrop-blur-md rounded-full border border-yellow-500/30'>
						<span className='text-yellow-400'>🎬</span>
						Em cartaz nos cinemas
					</span>
				:	<>
						{isLoading && (
							<div className='flex gap-1'>
								<div className='w-6 h-6 rounded-full bg-white/10 animate-pulse' />
								<div className='w-6 h-6 rounded-full bg-white/10 animate-pulse' />
								<div className='w-6 h-6 rounded-full bg-white/10 animate-pulse' />
							</div>
						)}

						{!isLoading && !hasError && providers.length > 0 && (
							<div>
								<h4 className='text-xs font-semibold text-white/80 mb-1'>
									Streaming
								</h4>
								<div className='flex flex-wrap gap-1'>
									{providers.map((provider) => (
										<ProviderIcon
											key={provider.provider_id}
											providerId={provider.provider_id}
											providerName={provider.provider_name}
											logoPath={provider.logo_path}
											size='sm'
										/>
									))}
								</div>
							</div>
						)}

						{!isLoading && !hasError && providers.length === 0 && (
							<span className='text-xs text-gray-400 italic'>
								Streaming indisponível
							</span>
						)}

						{hasError && (
							<span className='text-xs text-red-400 italic'>
								Erro ao carregar
							</span>
						)}
					</>
				}
			</div>

			<div className='absolute inset-0 rounded-xl bg-linear-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />
		</div>
	);
}
