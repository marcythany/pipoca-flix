'use client';

import { WatchProvider } from '@/lib/types/movie';
import { MovieImage } from './MovieImage';

interface WatchProvidersProps {
	providers: {
		flatrate?: WatchProvider[];
		buy?: WatchProvider[];
		rent?: WatchProvider[];
		link?: string;
	} | null;
	movieTitle: string;
}

export function WatchProviders({ providers, movieTitle }: WatchProvidersProps) {
	if (
		!providers ||
		(!providers.flatrate && !providers.buy && !providers.rent)
	) {
		return (
			<div className='mt-4 p-4 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-white/10'>
				<p className='text-sm text-gray-400'>
					Informação de streaming não disponível para esta região
				</p>
			</div>
		);
	}

	const renderProviderList = (
		providerList: WatchProvider[] | undefined,
		label: string,
	) => {
		if (!providerList || providerList.length === 0) return null;

		return (
			<div className='mb-4'>
				<h4 className='text-xs uppercase tracking-wider text-gray-400 mb-2'>
					{label}
				</h4>
				<div className='flex flex-wrap gap-2'>
					{providerList.map((provider) => (
						<div
							key={provider.provider_id}
							className='group relative flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 hover:border-red-500/50 transition-all duration-300'
							title={provider.provider_name}
						>
							{provider.logo_path ?
								<div className='relative w-6 h-6 rounded overflow-hidden flex-shrink-0'>
									<MovieImage
										src={provider.logo_path}
										alt={provider.provider_name}
										type='provider'
										sizes='24px'
										className='object-cover'
									/>
								</div>
							:	<div className='w-6 h-6 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0'>
									<span className='text-xs text-gray-300'>
										{provider.provider_name.charAt(0)}
									</span>
								</div>
							}
							<span className='text-sm font-medium text-gray-200'>
								{provider.provider_name}
							</span>

							{/* Efeito de brilho no hover */}
							<div className='absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className='mt-6 p-4 bg-zinc-900/50 backdrop-blur-md rounded-lg border border-white/10'>
			<h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
				<span className='w-1 h-5 bg-red-600 rounded-full' />
				Onde assistir
			</h3>

			{renderProviderList(providers.flatrate, 'Streaming')}
			{renderProviderList(providers.rent, 'Aluguel')}
			{renderProviderList(providers.buy, 'Compra')}

			{providers.link && (
				<a
					href={providers.link}
					target='_blank'
					rel='noopener noreferrer'
					className='inline-block mt-2 text-xs text-red-400 hover:text-red-300 transition-colors'
				>
					Ver mais opções na TMDB →
				</a>
			)}
		</div>
	);
}
