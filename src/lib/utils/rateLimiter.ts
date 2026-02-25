/**
 * Um rate limiter simples baseado em tempo (Token Bucket simplificado).
 * Garante um intervalo mínimo entre as requisições.
 */

interface LimiterOptions {
	/** Número máximo de requisições por intervalo */
	maxRequests: number;
	/** Intervalo de tempo em milissegundos */
	interval: number;
}

class RateLimiter {
	private timestamps: number[] = [];
	private maxRequests: number;
	private interval: number;

	constructor(options: LimiterOptions) {
		this.maxRequests = options.maxRequests;
		this.interval = options.interval;
	}

	/**
	 * Método principal para aguardar a vez de fazer uma requisição.
	 * Retorna uma Promise que resolve quando a requisição pode prosseguir.
	 */
	async waitForToken(): Promise<void> {
		const now = Date.now();

		// Remove timestamps mais antigos que o intervalo atual
		this.timestamps = this.timestamps.filter(
			(timestamp) => now - timestamp < this.interval,
		);

		// Se ainda temos espaço no intervalo, permite a requisição
		if (this.timestamps.length < this.maxRequests) {
			this.timestamps.push(now);
			return;
		}

		// Se atingiu o limite, calcula o tempo de espera
		const oldestTimestamp = this.timestamps[0];
		const waitTime = this.interval - (now - oldestTimestamp);

		if (waitTime > 0) {
			console.log(`Rate limit atingido. Aguardando ${waitTime}ms...`);
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			// Após esperar, tenta novamente (recursão simples)
			return this.waitForToken();
		}

		// Se por algum motivo não precisou esperar, prossegue
		this.timestamps.push(now);
	}
}

// Configuração para o TMDB: 40 requisições por segundo (40/1000ms)
// Para ser conservador, vamos usar 35 req/s para dar uma margem de segurança.
export const tmdbRateLimiter = new RateLimiter({
	maxRequests: 35,
	interval: 1000, // 1 segundo
});
