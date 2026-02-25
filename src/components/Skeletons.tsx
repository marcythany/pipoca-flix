export function MovieCardSkeleton() {
	return (
		<div className='aspect-2/3 rounded-xl bg-zinc-800 animate-pulse border border-white/5' />
	);
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6'>
			{Array.from({ length: count }).map((_, i) => (
				<MovieCardSkeleton key={i} />
			))}
		</div>
	);
}

export function HeroSectionSkeleton() {
	return (
		<section className='relative h-[80vh] w-full bg-zinc-900 animate-pulse'>
			<div className='absolute inset-0 bg-zinc-800' />
		</section>
	);
}
