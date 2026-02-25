import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		cacheComponents: true,
	},
	images: {
		domains: ['image.tmdb.org', 'placehold.co'],
	},
};

export default nextConfig;
