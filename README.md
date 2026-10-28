# Liora — Fullstack Landing Page & Payload CMS

Промо-сайт (сайт-візитка / лендінг) для бренду натуральної та фізіологічної косметики **Liora**, розроблений для переконання відвідувачів у перевагах продукції та залучення їх до основного інтернет-магазину на Django.

## Архітектура монорепозиторію

- `cms2/` — активний бекенд на **Payload CMS v3 + Next.js** із панеллю адміністратора, колекціями, блоковим конструктором і API для лендінгу. Дані зберігаються у PostgreSQL (Neon). `cms/` залишено як стару версію Payload 2.
- `frontend-ts/` — швидкий клієнтський SPA-застосунок на **Vite + Vanilla TypeScript**. Реалізує динамічну шаблонізацію блоків, обробку станів UI (loading, success, 404, error), адаптивну верстку (mobile-first) у пастельно-пудрових тонах бренду Liora.

---

## Швидкий старт

### 1. Налаштування та запуск Payload CMS (`cms2/`)

```bash
cd cms2
npm install
cp .env.example .env
# Заповніть DATABASE_URL (рядок підключення до PostgreSQL Neon) та PAYLOAD_SECRET
npm run dev
```

Адмін-панель буде доступна за адресою: [http://localhost:3000/admin](http://localhost:3000/admin)

### 2. Налаштування та запуск клієнтського лендінгу (`frontend-ts/`)

```bash
cd ../frontend-ts
npm install
cp .env.example .env
npm run dev
```

Клієнтський сайт буде доступний за адресою: [http://localhost:5173/](http://localhost:5173/)

---

## Змінні середовища

### `cms2/.env`
```env
PORT=3000
DATABASE_URL=postgres://user:password@ep-xyz.eu-central-1.aws.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=your-secret-key-32-chars-minimum
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,https://liora-landing-frontend.vercel.app
DJANGO_STORE_URL=http://localhost:8000
```

`cms2/` uses Payload 3; `cms/` is the legacy Payload 2 project. Do not run Payload 3 against the legacy database before an explicit schema/content migration. If Payload offers to rename `pages_rels` or `products_rels` to `users_sessions`, cancel startup and use a separate empty database or prepare a deliberate migration.

### `frontend-ts/.env`
```env
VITE_API_URL=
VITE_DJANGO_STORE_URL=http://localhost:8000
CMS_PROXY_URL=http://localhost:3000
```

During local development Vite proxies `/api` to Payload on port `3000`, so leave `VITE_API_URL` empty. In production, set it to the public CMS origin and add the frontend origin to CMS `CORS_ORIGINS`.

---

## Деплой на Vercel

1. **CMS**:
   - Framework Preset: Next.js / Other
   - Root Directory: `cms2`
   - Environment Variables: `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`, `CORS_ORIGINS`.

2. **Frontend**:
   - Framework Preset: Vite
   - Root Directory: `frontend-ts`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: `VITE_API_URL`, `VITE_DJANGO_STORE_URL`.
