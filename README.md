# BotanixMD Pro — Subscriptions + CMS

## What’s new
- **Stripe Subscriptions** with mixed cart support and Customer Portal.
- **Sanity CMS** for Learn blog + COA documents.
- Prisma `Subscription` table and webhook handlers.

## Setup
1) Install deps: `npm i`
2) DB: `npx prisma db push` then `node scripts/seed.ts`
3) Copy env: `cp .env.example .env.local` and fill keys:
   - Stripe secret/publishable/webhook
   - Stripe recurring **price IDs** for the slugs provided
   - Sanity project env vars (create at sanity.io)
4) Dev: `npm run dev`

## Subscriptions
- PDP has a "Subscribe & save 15%" toggle (monthly or quarterly).
- Replace ENV price IDs with your Stripe Price IDs.
- Customer Portal at `/account` (email lookup).

## CMS
- `/learn` lists posts from Sanity; `/learn/[slug]` renders basic body text.
- Schemas in `/sanity/schemas`. Run `npm run cms:studio` after installing Sanity CLI to spin up a local Studio.

## Deploy (Vercel + Postgres recommended)
- Create a Vercel Postgres and set `DATABASE_URL` to the connection string.
- `npx prisma migrate deploy` on first deploy.
