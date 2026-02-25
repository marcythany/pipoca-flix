import { env } from '@/env';
import { tmdbRateLimiter } from '@/lib/utils/rateLimiter';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const movieId = parseInt(id);
		if (isNaN(movieId) || movieId <= 0) {
			return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
		}

		await tmdbRateLimiter.waitForToken();

		const url = `${env.TMDB_BASE_URL}/movie/${movieId}?language=pt-BR&append_to_response=credits,videos`;
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 86400, tags: [`movie-${movieId}`] }, // 1 dia
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro ao buscar detalhes do filme' },
				{ status: response.status },
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Erro em /api/movie/[id]/details:', error);
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		);
	}
}
