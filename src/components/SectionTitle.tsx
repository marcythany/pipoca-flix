interface SectionTitleProps {
	icon?: string;
	title: string;
	subtitle?: string;
}

export function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
	return (
		<div className='mb-8'>
			<div className='flex items-center gap-2'>
				{icon && <span className='text-2xl'>{icon}</span>}
				<h2 className='text-2xl md:text-3xl font-bold text-white'>{title}</h2>
			</div>
			{subtitle && (
				<p className='text-gray-400 mt-1 text-sm md:text-base'>{subtitle}</p>
			)}
			<div className='w-20 h-1 bg-linear-to-r from-red-600 to-red-400 rounded-full mt-3' />
		</div>
	);
}
