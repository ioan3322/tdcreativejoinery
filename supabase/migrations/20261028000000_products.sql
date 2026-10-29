create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 150),
  category text not null check (char_length(category) between 2 and 80),
  price numeric(12, 2),
  description text not null check (char_length(description) between 10 and 5000),
  image_url text not null,
  tag text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
create policy "Products are publicly readable" on public.products for select using (true);
create policy "Authenticated users manage products" on public.products for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('Produse', 'Produse', true)
on conflict (id) do update set public = true;

create policy "Product images are publicly readable"
  on storage.objects for select using (bucket_id = 'Produse');
create policy "Authenticated users upload product images"
  on storage.objects for insert to authenticated with check (bucket_id = 'Produse');
create policy "Authenticated users update product images"
  on storage.objects for update to authenticated using (bucket_id = 'Produse') with check (bucket_id = 'Produse');
create policy "Authenticated users delete product images"
  on storage.objects for delete to authenticated using (bucket_id = 'Produse');
