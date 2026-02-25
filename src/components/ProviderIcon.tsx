'use client';

import { MovieImage } from './MovieImage';

interface ProviderIconProps {
	providerId: number;
	providerName: string;
	logoPath: string | null;
	size?: 'sm' | 'md';
}

export function ProviderIcon({
	providerId,
	providerName,
	logoPath,
	size = 'sm',
}: ProviderIconProps) {
	const sizeClasses = size === 'sm' ? 'w-8 h-8' : 'w-6 h-6';

	if (logoPath) {
		return (
			<div
				className={`relative ${sizeClasses} rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm border border-white/20 shadow-lg transition-transform hover:scale-110 hover:border-red-400/50`}
			>
				<MovieImage
					src={logoPath}
					alt={providerName}
					type='provider'
					sizes={size === 'sm' ? '32px' : '24px'}
					className='object-cover'
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
