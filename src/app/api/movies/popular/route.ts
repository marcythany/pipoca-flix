import { env } from '@/env';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const page = searchParams.get('page') || '1';

		// Rate limiting
		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}/movie/popular?language=pt-BR&page=${page}`;
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 3600, tags: ['popular-movies'] },
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro ao buscar filmes populares' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Erro em /api/movies/popular:', error);
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		);
	}
}
