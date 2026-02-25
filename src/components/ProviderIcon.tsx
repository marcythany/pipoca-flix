'use client';

import { env } from '@/env';
import Image from 'next/image';
import { useState } from 'react';

interface ProviderIconProps {
	providerId: number;
	providerName: string;
	logoPath: string | null;
	size?: 'sm' | 'md'; // sm: 8x8 (padrão do card), md: 6x6 com texto (WatchProviders)
}

export function ProviderIcon({
	providerId,
	providerName,
	logoPath,
	size = 'sm',
}: ProviderIconProps) {
	const [imgError, setImgError] = useState(false);

	const imageUrl =
		logoPath && !imgError ? `${env.TMDB_IMAGE_URL}/w45${logoPath}` : null;

	const sizeClasses =
		size === 'sm' ?
			'w-8 h-8' // usado no MovieCard
		:	'w-6 h-6'; // usado no WatchProviders (ícone pequeno ao lado do nome)

	if (imageUrl) {
		return (
			<div
				className={`relative ${sizeClasses} rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm border border-white/20 shadow-lg transition-transform hover:scale-110 hover:border-red-400/50`}
			>
				<Image
					src={imageUrl}
					alt={providerName}
					fill
					sizes={size === 'sm' ? '32px' : '24px'}
					className='object-cover'
					onError={() => setImgError(true)}
				/>
			</div>
		);
	}

	// Fallback: inicial do provedor
	return (
		<div
			className={`${sizeClasses} rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-white border border-white/10`}
		>
			{providerName.charAt(0)}
		</div>
	);
}
