'use client';

import { Movie } from '@/lib/types/movie';
import { formatReleaseYear } from '@/lib/utils/date';
import Link from 'next/link';
import { useState } from 'react';
import { MovieImage } from './MovieImage';
import { ProviderIcon } from './ProviderIcon';

interface MovieCardProps {
	movie: Movie;
	isNowPlaying?: boolean;
}

type Provider = {
	provider_id: number;
	provider_name: string;
	logo_path: string | null;
};

type ProvidersResponse = {
	flatrate?: Provider[];
	buy?: Provider[];
	rent?: Provider[];
	link?: string;
} | null;

export function MovieCard({ movie, isNowPlaying = false }: MovieCardProps) {
	const [providers, setProviders] = useState<Provider[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const handleMouseEnter = async () => {
		if (providers.length > 0 || isLoading || hasError || isNowPlaying) return;

		setIsLoading(true);
		setHasError(false);

		try {
			const response = await fetch(`/api/movie/${movie.id}/providers`);

			if (!response.ok) {
				throw new Error('Erro ao buscar provedores');
			}

			const data: ProvidersResponse = await response.json();
			const flatrateProviders = data?.flatrate?.slice(0, 3) || [];
			setProviders(flatrateProviders);
		} catch (error) {
			console.error(`Erro ao buscar providers para ${movie.title}:`, error);
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const releaseYear = formatReleaseYear(movie.release_date);

	return (
		<Link href={`/filme/${movie.id}`} className='group block'>
			<div
				className='relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-red-500/50 group-hover:shadow-2xl group-hover:shadow-red-600/20'
				onMouseEnter={handleMouseEnter}
			>
				<MovieImage
					src={movie.poster_path}
					alt={`Pôster do filme ${movie.title}`}
					type='poster'
					sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw'
					className='object-cover transition-transform duration-500 group-hover:scale-110'
				/>

				{/* Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 backdrop-blur-[2px]'>
					<h3 className='text-sm font-bold text-white line-clamp-2 drop-shadow-lg'>
						{movie.title}
					</h3>
					<div className='flex items-center gap-2 mt-1 text-xs text-gray-300'>
						<span>{releaseYear}</span>
						<span className='flex items-center gap-1'>
							⭐ {movie.vote_average?.toFixed(1) ?? '?'}
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

								{!isLoading && providers.length > 0 && (
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

					<div className='absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none' />
				</div>
			</div>
		</Link>
	);
}
