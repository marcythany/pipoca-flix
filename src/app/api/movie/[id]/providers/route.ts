// src/app/api/movie/[id]/providers/route.ts
import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// 1. Extrair o ID de forma assíncrona
		const { id } = await params;

		// 2. Validar se é um número
		const movieId = parseInt(id);
		if (isNaN(movieId)) {
			return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
		}

		// 3. Verificar se as variáveis de ambiente estão definidas
		if (!env.TMDB_BASE_URL || !env.TMDB_API_KEY) {
			return NextResponse.json(
				{ error: 'Erro de configuração' },
				{ status: 500 },
			);
		}

		// 4. Montar URL e fazer requisição ao TMDB
		const url = `${env.TMDB_BASE_URL}/movie/${movieId}/watch/providers`;

		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_API_KEY}`,
			},
			next: { revalidate: 3600 }, // cache por 1 hora
		});

		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Erro na API TMDB' },
				{ status: response.status },
			);
		}

		const data = await response.json();

		// 5. Retornar apenas provedores do Brasil (ou fallback EUA)
		const brProviders = data.results?.BR || data.results?.US || null;

		return NextResponse.json(brProviders);
	} catch (error) {
		console.error('💥 API Route - Erro interno:', error);
		return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
	}
}
