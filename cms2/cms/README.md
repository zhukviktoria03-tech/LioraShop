# Liora Payload CMS

Payload CMS 3 backend for the Liora landing page. It uses Next.js, PostgreSQL, and the Payload Lexical editor.

## Local development

From the repository root:

```bash
cd cms2/cms
npm install
cp .env.example .env
```

Set `DATABASE_URL` to a PostgreSQL connection string and `PAYLOAD_SECRET` to a long random value in `.env`, then run:

```bash
npm run dev
```

Open the admin panel at <http://localhost:3000/admin>. On first run, Payload prompts you to create the first admin user.

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
