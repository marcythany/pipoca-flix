// app/api/movies/[category]/route.ts
import { env } from '@/env';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ category: string }> },
) {
	try {
		const { category } = await params;
		const { searchParams } = new URL(request.url);
		const page = searchParams.get('page') || '1';

		// Aplica rate limiting AQUI (dentro da rota de API)
		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}/movie/${category}?language=pt-BR&page=${page}`;
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 3600 }, // cache opcional
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro no TMDB' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Erro na API de filmes:', error);
		return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
	}
}
