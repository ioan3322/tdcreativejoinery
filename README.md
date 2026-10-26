# TD Creative Joinery

Next.js App Router starter for `tdcreativejoinery.ro`.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local`. The quote endpoint intentionally returns a clear `503` until Supabase persistence is wired with a service-role key; no inquiry is presented as saved before that configuration exists. Stripe and Resend variables are reserved for the checkout and transactional email integrations.

## Current implementation status

- Public presentation pages, portfolio, catalog, product detail pages, and a persisted client cart are available.
- Quote input is validated in the browser and API route. It remains disabled until Supabase is configured.
- `supabase/migrations/20261025000000_initial_schema.sql` creates the private quote-request table and restrictive RLS policy.
- The catalog is demonstration data and must not be treated as live inventory.

Run the TypeScript check and production build with:

```bash
npm run typecheck
npm run build
```

## Next production steps

1. Apply the migration, add the server Supabase client, and insert validated quote requests in `app/api/quote/route.ts`.
2. Add Stripe Checkout session creation and a signed webhook before enabling online payment.
3. Add Supabase Auth and an admin route protected by server-side role checks.
4. Replace demonstration Unsplash imagery and catalog data with approved company assets and real stock values.
