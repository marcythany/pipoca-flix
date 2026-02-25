/**
 * Rate limiter simples baseado em janela de tempo (Sliding Window Log).
 * Garante um número máximo de requisições por intervalo.
 */

interface RateLimiterOptions {
	/** Número máximo de requisições permitidas no intervalo */
	maxRequests: number;
	/** Duração do intervalo em milissegundos */
	intervalMs: number;
}

class RateLimiter {
	private readonly maxRequests: number;
	private readonly intervalMs: number;
	private timestamps: number[] = [];

	constructor({ maxRequests, intervalMs }: RateLimiterOptions) {
		this.maxRequests = maxRequests;
		this.intervalMs = intervalMs;
	}

	/**
	 * Bloqueia até que uma requisição possa ser executada, respeitando o limite.
	 */
	async waitForToken(): Promise<void> {
		const now = Date.now();

		// Remove registros antigos fora da janela atual
		this.timestamps = this.timestamps.filter(
			(timestamp) => now - timestamp < this.intervalMs,
		);

		// Se ainda há espaço, permite a requisição imediatamente
		if (this.timestamps.length < this.maxRequests) {
			this.timestamps.push(now);
			return;
		}

		// Calcula o tempo necessário para o próximo token ficar disponível
		const oldestTimestamp = this.timestamps[0];
		const waitTime = this.intervalMs - (now - oldestTimestamp);

		if (waitTime > 0) {
			console.log(`⏳ Rate limit atingido. Aguardando ${waitTime}ms...`);
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			// Tenta novamente após a espera
			return this.waitForToken();
		}

		// Caso raro: waitTime <= 0, adiciona e prossegue
		this.timestamps.push(now);
	}
}

// Configuração conservadora para API do TMDB (limite real: 40 req/s)
export const tmdbRateLimiter = new RateLimiter({
	maxRequests: 35,
	intervalMs: 1000,
});
