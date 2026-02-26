export type Movie = {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
};

export type MovieResponse = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

// Tipo para os provedores de streaming (onde assistir)
export type WatchProvider = {
	provider_id: number;
	provider_name: string;
	logo_path: string | null;
	display_priority: number;
};

export type MovieWatchProvidersResponse = {
	id: number;
	results: {
		[countryCode: string]:
			| {
					link?: string;
					flatrate?: WatchProvider[];
					buy?: WatchProvider[];
					rent?: WatchProvider[];
			  }
			| undefined;
	};
};

// ---------- Tipos para detalhes estendidos do filme ----------
export type Genre = {
	id: number;
	name: string;
};

export type Cast = {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
};

export type Crew = {
	id: number;
	name: string;
	job: string;
};

export type Video = {
	key: string;
	site: string;
	type: string;
	name: string;
};

export type MovieDetails = {
	id: number;
	title: string;
	tagline: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	runtime: number;
	budget: number;
	revenue: number;
	original_language: string;
	genres: Genre[];
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	videos: {
		results: Video[];
	};
};
