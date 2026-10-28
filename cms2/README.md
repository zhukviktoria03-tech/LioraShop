# Liora Payload CMS

Payload CMS 3 backend for the Liora landing page. It uses Next.js, PostgreSQL, and the Payload Lexical editor.

## Local development

From the repository root:

```bash
cd cms2
npm install
cp .env.example .env
```

Set `DATABASE_URL` to a PostgreSQL connection string and `PAYLOAD_SECRET` to a long random value in `.env`, then run:

```bash
npm run dev
```

Open the admin panel at <http://localhost:3000/admin>. On first run, Payload prompts you to create the first admin user.

This project uses Payload 3, while the legacy `cms/` project uses Payload 2. Do not point it at the legacy database until its schema and content have been migrated intentionally. Payload 3 may suggest renaming `pages_rels` or `products_rels` to `users_sessions`; do not accept those renames. Use a separate empty PostgreSQL database for a fresh setup.

## Content model

- `users`: Payload admin authentication
- `media`: public image uploads with a 400 x 400 thumbnail
- `products`: product details and bestseller flag
- `pages`: landing page content composed from Hero, Philosophy, Bestsellers, Routine, and CTA blocks

Public endpoints are available under `/api`:

- `GET /api/page-by-slug/:slug`
- `GET /api/bestsellers?limit=3`
- `GET /api/common`

Use `CORS_ORIGINS` for the allowed frontend origins and `DJANGO_STORE_URL` for the Django shop base URL. Regenerate Payload types after schema changes with `npm run generate:types`.

For an isolated local PostgreSQL database with Docker, run `docker compose up`. The compose setup uses a local development-only password and does not use `DATABASE_URL` from `.env` for its Payload container.
