import { env } from '@/env';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const page = searchParams.get('page') || '1';

		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}/movie/now_playing?language=pt-BR&region=BR&page=${page}`;
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 1800, tags: ['now-playing-movies'] }, // 30 min
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro ao buscar filmes em cartaz' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Erro em /api/movies/now-playing:', error);
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		);
	}
}
