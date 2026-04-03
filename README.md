# Apartment Comparison App

Full-stack Next.js (App Router) app for comparing apartments by price, size, and commute times.

## Stack

- Next.js + TypeScript
- Tailwind CSS + DaisyUI
- Supabase (PostgreSQL)
- Google Maps Distance Matrix API (with automatic mock fallback)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GOOGLE_MAPS_API_KEY` (optional, app falls back to mock travel times if missing)

4. Create the database table in Supabase SQL editor using `supabase/schema.sql`.

5. Run the app:

```bash
npm run dev
```

The app is ready to deploy on Vercel.
