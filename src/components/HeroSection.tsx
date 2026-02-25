import { MovieDetails } from '@/lib/types/movie';
import { formatReleaseYear } from '@/lib/utils/date';
import Link from 'next/link';
import { MovieImage } from './MovieImage';

interface HeroSectionProps {
	movie: MovieDetails;
}

export function HeroSection({ movie }: HeroSectionProps) {
	const overview =
		movie.overview.length > 200 ?
			`${movie.overview.substring(0, 200)}...`
		:	movie.overview;

	const trailer = movie.videos?.results?.find(
		(video) => video.type === 'Trailer' && video.site === 'YouTube',
	);

	const releaseYear = formatReleaseYear(movie.release_date);

	return (
		<section className='relative h-[80vh] w-full overflow-hidden'>
			{movie.backdrop_path && (
				<>
					<MovieImage
						src={movie.backdrop_path}
						alt={movie.title}
						type='backdrop'
						priority
						className='object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent' />
					<div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent' />
				</>
			)}

			<div className='relative container mx-auto h-full flex items-center px-4'>
				<div className='max-w-2xl space-y-4'>
					<span className='inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-red-600/80 backdrop-blur-md rounded-full border border-red-400/30'>
						Em Destaque
					</span>

					<h1 className='text-4xl md:text-6xl font-bold text-white'>
						{movie.title}
					</h1>

					<div className='flex items-center gap-4 text-sm text-gray-200'>
						<span>{releaseYear}</span>
						<span className='flex items-center gap-1'>
							⭐ {movie.vote_average?.toFixed(1) ?? '?'}
						</span>
						<span>{movie.runtime} min</span>
					</div>

					<p className='text-lg text-gray-200 line-clamp-3'>{overview}</p>

					<div className='flex gap-4 pt-4'>
						<Link
							href={`/filme/${movie.id}`}
							className='px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/20'
						>
							Ver Detalhes
						</Link>
						{trailer && (
							<a
								href={`https://youtube.com/watch?v=${trailer.key}`}
								target='_blank'
								rel='noopener noreferrer'
								className='px-8 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg font-medium transition-all duration-300 border border-white/20'
							>
								▶ Assistir Trailer
							</a>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
