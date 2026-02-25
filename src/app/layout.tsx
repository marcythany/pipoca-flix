import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Pipoca Flix',
	description: 'Encontre seus filmes!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body
				className={`${openSans.variable} bg-zinc-950 text-white antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
