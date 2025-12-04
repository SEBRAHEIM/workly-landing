-- Run this file in Supabase SQL editor (Auth DB).
-- It defines pricing per project type, set by each creator.

create table if not exists public.creator_pricing (
  id bigint generated always as identity primary key,
  creator_id uuid not null references auth.users(id) on delete cascade,
  project_type text not null,
  price_aed numeric(10,2) not null,
  created_at timestamptz default now()
);

alter table public.creator_pricing enable row level security;

-- Creators can insert / update / delete only their own rows
create policy if not exists "Creator can manage own pricing"
on public.creator_pricing
for all
to authenticated
using (auth.uid() = creator_id)
with check (auth.uid() = creator_id);

-- Any logged-in user (student or creator) can view pricing
create policy if not exists "All users can view creator pricing"
on public.creator_pricing
for select
to authenticated
using (true);
