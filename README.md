# Ebawara

An online storefront for electronics and home appliances, built with **Next.js 15** and **Payload CMS 3**.

**Live app:** https://ebawara.vercel.app

Shoppers can browse products by category, open product pages, search, save favourites and use a cart. Products, categories, tags and media are managed from the Payload admin panel, and the frontend reads them through Payload's REST and GraphQL APIs.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| CMS / backend | Payload CMS 3 (admin panel, REST and GraphQL APIs) |
| Database | MongoDB (Mongoose adapter) |
| Media storage | Amazon S3 (`@payloadcms/storage-s3`), images processed with Sharp |
| Authentication | Clerk (storefront sign-in); Payload auth for admin users |
| UI | Tailwind CSS 4, Radix UI, shadcn/ui components |
| Rich text | Lexical editor |
| Containers | Docker (multi-stage production image), Docker Compose (local dev with MongoDB) |
| Hosting | Vercel |

## Features

- Product catalogue with categories and tags, managed in Payload CMS
- Product detail pages (`/products/[id]`)
- Search bar, favourites and cart icon
- Responsive header with mobile side menu
- Clerk sign-in on the storefront
- Payload admin panel at `/admin`
- REST API at `/api/*` and GraphQL at `/api/graphql` (playground at `/api/graphql-playground`)
- Product images stored in S3

## Project structure

```
src/
├── app/
│   ├── (frontend)/          # Storefront: home page and product pages
│   └── (payload)/           # Payload admin panel, REST and GraphQL routes
├── collections/             # Payload collections: Users, Media, Products, Categories, Tags
├── components/              # Header, Footer, SearchBar, CartIcon, FavoriteButton, etc.
│   └── ui/                  # shadcn/ui building blocks
├── constants/  hooks/  lib/  images/
├── middleware.ts            # Request middleware (Clerk)
├── payload.config.ts        # Payload config: MongoDB, S3 storage, Lexical, collections
└── payload-types.ts         # Generated TypeScript types
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URI` | MongoDB connection string (use `mongodb://mongo/<db-name>` with Docker Compose) |
| `PAYLOAD_SECRET` | Secret used by Payload to sign tokens |
| `S3_BUCKET` | S3 bucket for media uploads |
| `S3_REGION` | AWS region of the bucket |
| `S3_ACCESS_KEY_ID` | AWS access key with access to the bucket |
| `S3_SECRET_ACCESS_KEY` | AWS secret key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |

## Running locally

Requirements: Node.js 18.20.2+ or 20.9+, pnpm 10, and MongoDB (or Docker).

```bash
pnpm install
cp .env.example .env   # then fill in the values above
pnpm dev
```

- Storefront: http://localhost:3000
- Admin panel: http://localhost:3000/admin (create the first admin user on first visit)

### With Docker Compose

Runs the app and a MongoDB container together. Set `DATABASE_URI=mongodb://mongo/ebawara` in `.env`, then:

```bash
docker compose up
```

### Production Docker image

The `Dockerfile` is a multi-stage build (dependencies → build → slim runtime) that runs as a non-root user on port 3000. It needs `output: 'standalone'` in `next.config.mjs`.

```bash
docker build -t ebawara .
docker run -p 3000:3000 --env-file .env ebawara
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm devsafe` | Clear `.next` and start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |
| `pnpm generate:types` | Regenerate `payload-types.ts` from the collections |
| `pnpm generate:importmap` | Regenerate the Payload admin import map |

## Deployment

The app is deployed on Vercel at https://ebawara.vercel.app. MongoDB and S3 credentials are set as Vercel environment variables.

## Author

Built by **Michael Boyo** ([@MichaelBoyo](https://github.com/MichaelBoyo)).
