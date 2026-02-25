'use client';

import { env } from '@/env';
import Image from 'next/image';
import { useState } from 'react';

interface MovieImageProps {
	src: string | null;
	alt: string;
	type: 'poster' | 'backdrop' | 'profile' | 'provider';
	fill?: boolean;
	sizes?: string;
	className?: string;
	priority?: boolean;
}

export function MovieImage({
	src,
	alt,
	type,
	fill = true,
	sizes,
	className = '',
	priority = false,
}: MovieImageProps) {
	const [error, setError] = useState(false);

	// Tamanhos padrão para cada tipo de imagem
	const getSize = () => {
		switch (type) {
			case 'poster':
				return 'w500';
			case 'backdrop':
				return 'original';
			case 'profile':
				return 'w185';
			case 'provider':
				return 'w45';
			default:
				return 'original';
		}
	};

	// Se não tem src ou deu erro, usa placeholder
	if (!src || error) {
		const placeholderDimensions = {
			poster: { width: 500, height: 750, bg: '1f1f1f', text: '666666' },
			backdrop: { width: 1280, height: 720, bg: '1f1f1f', text: '666666' },
			profile: { width: 185, height: 278, bg: '1f1f1f', text: '666666' },
			provider: { width: 45, height: 45, bg: '1f1f1f', text: '666666' },
		};

		const dims = placeholderDimensions[type];
		const placeholderUrl = `https://placehold.co/${dims.width}x${dims.height}/${dims.bg}/${dims.text}?text=Sem+Imagem`;

		return (
			<Image
				src={placeholderUrl}
				alt={alt}
				fill={fill}
				sizes={sizes}
				className={className}
				priority={priority}
				onError={() => setError(true)}
			/>
		);
	}

	// Constrói URL completa do TMDB
	const size = getSize();
	const imageUrl =
		src.startsWith('http') ? src : `${env.TMDB_IMAGE_URL}/${size}${src}`;

	return (
		<Image
			src={imageUrl}
			alt={alt}
			fill={fill}
			sizes={sizes}
			className={className}
			priority={priority}
			onError={() => setError(true)}
		/>
	);
}
