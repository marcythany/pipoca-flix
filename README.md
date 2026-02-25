# 🍿 PipocaFlix

PipocaFlix é um site de catálogo de filmes que consome a API do The Movie Database (TMDB). Desenvolvido com **Next.js 16**, **Tailwind CSS v4** e **TypeScript**, oferece uma experiência moderna e responsiva para descobrir filmes populares, em cartaz, mais bem avaliados e buscar por títulos.

## 🚀 Tecnologias

- [Next.js 16](https://nextjs.org/) – Framework React com suporte a Server Components e App Router
- [Tailwind CSS v4](https://tailwindcss.com/) – Estilização utilitária e performática
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [TMDB API](https://developers.themoviedb.org/3) – Fonte de dados de filmes

## ✨ Funcionalidades

- Página inicial com seções:
  - Filme em destaque (Hero)
  - Em cartaz nos cinemas
  - Mais populares
  - Mais bem avaliados
- Página de detalhes do filme:
  - Sinopse, elenco, trailer (YouTube), provedores de streaming (Brasil)
  - Ficha técnica completa
- Busca de filmes com sugestão em tempo real
- Design responsivo e moderno com efeitos glassmorphism
- Rate limiting para respeitar os limites da API do TMDB
- Otimização de imagens com `next/image`

## 📦 Como executar

### Pré-requisitos

- Node.js 20.x ou superior
- Uma chave de API do TMDB (crie uma conta em [themoviedb.org](https://www.themoviedb.org/) e gere uma chave)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/pipoca-flix.git
   cd pipoca-flix
   ```

   Instale as dependências:

```bash
npm install


# ou

yarn

# ou

pnpm install
```

2. Configure as variáveis de ambiente:
   Crie um arquivo .env.local na raiz do projeto com o seguinte conteúdo:

env
TMDB_API_KEY=sua_chave_api_aqui
TMDB_BASE_URL=<https://api.themoviedb.org/3>
NEXT_PUBLIC_TMDB_IMAGE_URL=<https://image.tmdb.org/t/p>

3. Execute o servidor de desenvolvimento:

```bash
npm run dev

# ou

yarn dev

# ou

pnpm dev
```

Abra <http://localhost:3000> no navegador.

Build para produção

```bash
npm run build
npm start
```

🔧 Estrutura de pastas

```text
src/
├── app/ # Rotas e layouts (App Router)
│ ├── api/ # Rotas de API (rate limiting, proxy TMDB)
│ ├── busca/ # Página de busca
│ ├── filme/[id]/ # Página de detalhes do filme
│ └── page.tsx # Página inicial
├── components/ # Componentes React
│ ├── sections/ # Componentes de seção (HeroMovie, etc.)
│ └── ui/ # Componentes reutilizáveis (MovieImage, etc.)
├── lib/ # Utilitários, serviços e tipos
│ ├── services/tmdb.ts # Funções de acesso aos dados (via API interna)
│ ├── types/ # Tipos TypeScript
│ └── utils/ # Rate limiter, formatação de data
└── env.ts # Validação de variáveis de ambiente
```

🧠 Conceitos aplicados
Server Components e Client Components para otimizar a renderização

Suspense e Streaming para carregamento progressivo

Rate Limiting em memória (Token Bucket) para controlar chamadas à API TMDB

Cache de requisições via fetch com next.revalidate

Imagens otimizadas com fallback para placeholders

Tailwind CSS v4 com configuração CSS-first

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido por Marcy
