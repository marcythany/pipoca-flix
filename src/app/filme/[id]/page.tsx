import { Header } from '@/components/Header';
import { MovieDetailsClient } from '@/components/MovieDetailsClient';
import { Suspense } from 'react';

interface MoviePageProps {
	params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
	// Não faça await aqui! Passe a Promise diretamente.
	return (
		<Suspense fallback={<div>Carregando detalhes do filme...</div>}>
			<Header />
			<MovieDetailsClient paramsPromise={params} />
		</Suspense>
	);
}
