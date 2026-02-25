'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

export function Header() {
	const pathname = usePathname();
	const router = useRouter();
	const isHome = pathname === '/';
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const mobileSearchRef = useRef<HTMLDivElement>(null);

	// Fecha a busca mobile ao clicar fora (opcional)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				mobileSearchRef.current &&
				!mobileSearchRef.current.contains(event.target as Node) &&
				isSearchOpen
			) {
				setIsSearchOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isSearchOpen]);

	// Foca no input quando a busca mobile abre
	useEffect(() => {
		if (isSearchOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isSearchOpen]);

	const handleAnchorClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		targetId: string,
	) => {
		if (isHome) {
			e.preventDefault();
			const element = document.getElementById(targetId);
			if (element) {
				const headerHeight = 80; // altura aproximada do header
				const elementPosition =
					element.getBoundingClientRect().top + window.scrollY;
				window.scrollTo({
					top: elementPosition - headerHeight,
					behavior: 'smooth',
				});
			}
		}
	};

	const handleSearchSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
			setSearchQuery('');
			setIsSearchOpen(false);
		}
	};

	return (
		<>
			<header className='fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10'>
				<div className='container mx-auto flex items-center justify-between px-4 py-4'>
					{/* Logo */}
					<Link
						href='/'
						className='text-3xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors'
					>
						PIPOCA<span className='text-white'>FLIX</span>
					</Link>

					{/* Navegação para desktop */}
					<nav className='hidden md:flex items-center space-x-6'>
						<Link
							href='/'
							className='text-sm font-medium text-gray-200 hover:text-white transition-colors'
						>
							Início
						</Link>
						<Link
							href='/#popular'
							onClick={(e) => handleAnchorClick(e, 'popular')}
							className='text-sm font-medium text-gray-200 hover:text-white transition-colors'
						>
							Populares
						</Link>
						<Link
							href='/#now-playing'
							onClick={(e) => handleAnchorClick(e, 'now-playing')}
							className='text-sm font-medium text-gray-200 hover:text-white transition-colors'
						>
							Lançamentos
						</Link>
						<Link
							href='/#top-rated'
							onClick={(e) => handleAnchorClick(e, 'top-rated')}
							className='text-sm font-medium text-gray-200 hover:text-white transition-colors'
						>
							Top Avaliados
						</Link>
					</nav>

					{/* Busca e avatar */}
					<div className='flex items-center gap-3'>
						{/* Busca Desktop */}
						<form
							onSubmit={handleSearchSubmit}
							className='hidden md:block relative'
						>
							<input
								type='text'
								placeholder='Buscar filmes...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-64 px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200'
							/>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
								/>
							</svg>
						</form>

						{/* Botão de busca mobile */}
						<button
							onClick={() => setIsSearchOpen(true)}
							className='md:hidden p-2 text-gray-200 hover:text-white transition-colors'
							aria-label='Abrir busca'
							aria-expanded={isSearchOpen}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
								/>
							</svg>
						</button>

						{/* Avatar */}
						<div className='w-10 h-10 rounded-full bg-red-600/20 backdrop-blur-sm border border-red-600/30 flex items-center justify-center'>
							<span className='text-sm font-bold text-white'>PF</span>
						</div>
					</div>
				</div>
			</header>

			{/* Overlay de busca mobile */}
			{isSearchOpen && (
				<div
					className='fixed inset-0 z-40 md:hidden'
					style={{ top: '80px' }} // altura aproximada do header
				>
					{/* Fundo escuro com blur */}
					<div className='absolute inset-0 bg-black/80 backdrop-blur-sm' />

					{/* Container da busca */}
					<div
						ref={mobileSearchRef}
						className='relative container mx-auto px-4 py-6'
					>
						<form onSubmit={handleSearchSubmit} className='flex gap-2'>
							<div className='relative flex-1'>
								<input
									ref={searchInputRef}
									type='text'
									placeholder='Buscar filmes...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50'
								/>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
									/>
								</svg>
							</div>

							{/* Botão de fechar */}
							<button
								type='button'
								onClick={() => setIsSearchOpen(false)}
								className='px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-gray-200 hover:text-white transition-colors'
								aria-label='Fechar busca'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18 18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</form>

						{/* Sugestão rápida (opcional) */}
						<p className='text-xs text-gray-400 mt-3 text-center'>
							Pressione Enter para buscar
						</p>
					</div>
				</div>
			)}
		</>
	);
}
