create extension if not exists "pgcrypto";

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  phone text,
  project_type text,
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new', 'in_review', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create policy "No public access to quote requests"
  on public.quote_requests for all
  using (false)
  with check (false);

comment on table public.quote_requests is 'Private inquiries inserted by a trusted server-side client.';
