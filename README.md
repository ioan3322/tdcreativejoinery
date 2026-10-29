# TD Creative Joinery

Next.js App Router starter for `tdcreativejoinery.ro`.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local`. Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase. The service-role key must remain server-only. Stripe and Resend variables are reserved for the checkout and transactional email integrations.

## Current implementation status

- Public presentation pages, portfolio, catalog, product detail pages, and a persisted client cart are available.
- Quote input is validated in the browser and API route. It remains disabled until Supabase is configured.
- `supabase/migrations/20261025000000_initial_schema.sql` creates the private quote-request table and restrictive RLS policy.
- The catalog is loaded from Supabase after applying `supabase/migrations/20261028000000_products.sql`.

Run the TypeScript check and production build with:

```bash
npm run typecheck
npm run build
```

## Next production steps

1. Apply both migrations in `supabase/migrations/`, then create an admin user in Supabase Auth.
2. Open `/admin` to upload product details and images to the `produse` bucket.
3. Add Stripe Checkout session creation and a signed webhook before enabling online payment.
4. Add role-based admin checks if more than one authenticated Supabase user will access the panel.
