// src/components/Header.tsx
'use client'; // Necessário para usar o evento de clique e rolagem suave manual (opcional)

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
	const pathname = usePathname();
	const isHome = pathname === '/';

	// Função para lidar com o clique nos links de âncora
	const handleAnchorClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		targetId: string,
	) => {
		if (isHome) {
			// Se já estiver na home, previne o comportamento padrão do Link
			e.preventDefault();
			const element = document.getElementById(targetId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
		// Se não estiver na home, o Link leva para /#targetId normalmente
	};

	return (
		<header className='fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10'>
			<div className='container mx-auto flex items-center justify-between px-4 py-4'>
				<Link
					href='/'
					className='text-3xl font-bold text-red-600 tracking-tight hover:text-red-500 transition-colors'
				>
					PIPOCA<span className='text-white'>FLIX</span>
				</Link>

				<nav className='hidden md:flex space-x-6'>
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

					{/* Se quiser um link para "Mais Avaliados", pode adicionar */}
					<Link
						href='/#top-rated'
						onClick={(e) => handleAnchorClick(e, 'top-rated')}
						className='text-sm font-medium text-gray-200 hover:text-white transition-colors'
					>
						Top Avaliados
					</Link>
				</nav>

				<div className='w-10 h-10 rounded-full bg-red-600/20 backdrop-blur-sm border border-red-600/30 flex items-center justify-center'>
					<span className='text-sm font-bold text-white'>PF</span>
				</div>
			</div>
		</header>
	);
}
