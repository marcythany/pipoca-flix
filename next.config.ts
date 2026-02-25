import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		cacheComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				port: '',
				pathname: '/t/p/**',
				search: '',
			},
		],
	},
};

export default nextConfig;
