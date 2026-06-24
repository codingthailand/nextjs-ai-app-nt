<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Development Guidelines

For TypeScript code style and best practices: @docs/typescript-guidelines.md


# Repo-specific

## Commands

- `npm run dev` — dev server (Next.js 16 app)
- `npm run build` — production build (typecheck included by Next)
- `npm run lint` — ESLint v9 flat config
- No separate `typecheck`, `test`, or `generate` scripts exist

## Prisma v7 (MariaDB)

- Uses `prisma.config.ts` (new v7 config format) with `dotenv/config` for env loading
- Driver adapter: `@prisma/adapter-mariadb` — PrismaClient wraps it in `src/lib/prisma.ts`
- Custom output path: `generated/prisma` (gitignored) — run `npx prisma generate` after clone
- Schema at `prisma/schema.prisma` — MySQL provider, mixed snake_case (legacy ecommerce tables) and PascalCase (better-auth models)

## Auth

- better-auth 1.6.11, email/password only, Prisma adapter with MySQL provider
- Server handler: `src/app/api/auth/[...all]/route.ts`
- Client: `src/lib/auth-client.ts` (used in `"use client"` components)
- Config: `src/lib/auth.ts`

## UI & Styling

- Tailwind CSS v4 — uses `@import "tailwindcss"` syntax (not `@tailwind` directives)
- Colors in oklch, dark mode via `next-themes`
- shadcn v4 `radix-luma` style, Remixicon icons, components in `src/components/ui/`
- `cn()` utility: `src/lib/utils.ts` (clsx + tailwind-merge)

## State

- Cart via Zustand `persist` middleware, localStorage key `skill-cart` (`src/lib/cart-store.ts`)

## Project layout

- `src/app/(auth)/` — login, signup (own `<html>` layout)
- `src/app/(front)/` — main pages (home, products, cart, course, about, contact; own `<html>` layout)
- `src/app/api/` — route handlers (auth, contact)
- `src/components/` — app components; `ui/` — shadcn primitives
- `src/lib/` — shared utilities
- `docs/` — feature specs (ADMIN-CLIENT, CONTACT) and local DB setup guide
- `@/*` maps to `src/`

## Config

- `next.config.ts` — `cacheComponents: true` (Next.js 16), image `remotePatterns` for `www.fffuel.co` and `api.codingthailand.com`

## Build & deploy

- Docker build runs `npx prisma generate` then `npm run build`; uses `.next/standalone` + `node server.js`
- Local DB: MariaDB via Docker (`docs/install_mariadb_with_docker.txt`), connection in `.env`

## Lint

- ESLint v9 flat config at `eslint.config.mjs` — `core-web-vitals` + `typescript` configs from `eslint-config-next`
