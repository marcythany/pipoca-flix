import { env } from '@/env';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get('query');
		const page = searchParams.get('page') || '1';

		if (!query) {
			return NextResponse.json(
				{ error: 'Query parameter is required' },
				{ status: 400 },
			);
		}

		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}/search/movie?language=pt-BR&query=${encodeURIComponent(
			query,
		)}&page=${page}`;
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 60 }, // cache curto para busca
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro ao buscar filmes' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Erro em /api/movies/search:', error);
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		);
	}
}
