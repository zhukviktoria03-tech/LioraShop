# Liora — Fullstack Landing Page & Payload CMS

Промо-сайт (сайт-візитка / лендінг) для бренду натуральної та фізіологічної косметики **Liora**, розроблений для переконання відвідувачів у перевагах продукції та залучення їх до основного інтернет-магазину на Django.

## Архітектура монорепозиторію

- `cms/` — бекенд на **Payload CMS v3** (Node.js, Express/Next runtime, TypeScript) із панеллю адміністратора, налаштуванням колекцій, блокового конструктора сторінок та кастомними API-ендпоінтами. Зберігання даних — хмарна PostgreSQL (Neon).
- `frontend-ts/` — швидкий клієнтський SPA-застосунок на **Vite + Vanilla TypeScript**. Реалізує динамічну шаблонізацію блоків, обробку станів UI (loading, success, 404, error), адаптивну верстку (mobile-first) у пастельно-пудрових тонах бренду Liora.

---

## Швидкий старт

### 1. Налаштування та запуск Payload CMS (`cms/`)

```bash
cd cms
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

### `cms/.env`
```env
PORT=3000
DATABASE_URL=postgres://user:password@ep-xyz.eu-central-1.aws.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=your-secret-key-32-chars-minimum
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173,https://liora-landing-frontend.vercel.app
DJANGO_STORE_URL=http://localhost:8000
```

### `frontend-ts/.env`
```env
VITE_API_URL=http://localhost:3000
VITE_DJANGO_STORE_URL=http://localhost:8000
```

---

## Деплой на Vercel

1. **CMS**:
   - Framework Preset: Next.js / Other
   - Root Directory: `cms`
   - Environment Variables: `DATABASE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`, `CORS_ORIGINS`.

2. **Frontend**:
   - Framework Preset: Vite
   - Root Directory: `frontend-ts`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: `VITE_API_URL`.
