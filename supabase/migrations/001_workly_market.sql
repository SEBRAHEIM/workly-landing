create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('student','creator')) not null default 'student',
  username text unique,
  nationality text,
  avatar_url text,
  bio text,
  creator_ready boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_categories (
  creator_id uuid not null references public.profiles(id) on delete cascade,
  category_slug text not null,
  created_at timestamptz not null default now(),
  primary key (creator_id, category_slug)
);

create table if not exists public.creator_samples (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  file_url text not null,
  file_type text,
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  category_slug text not null,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','negotiating','agreed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  actor_id uuid not null references public.profiles(id) on delete cascade,
  amount_cents int not null check (amount_cents > 0),
  currency text not null default 'AED',
  is_final boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique references public.requests(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  agreed_amount_cents int not null check (agreed_amount_cents > 0),
  currency text not null default 'AED',
  status text not null default 'active' check (status in ('active','delivered','completed','cancelled')),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.creator_categories enable row level security;
alter table public.creator_samples enable row level security;
alter table public.requests enable row level security;
alter table public.offers enable row level security;
alter table public.orders enable row level security;

drop policy if exists "profiles_select_public" on public.profiles;
create policy "profiles_select_public"
on public.profiles
for select
to authenticated
using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "creator_categories_select" on public.creator_categories;
create policy "creator_categories_select"
on public.creator_categories
for select
to authenticated
using (true);

drop policy if exists "creator_categories_write_own" on public.creator_categories;
create policy "creator_categories_write_own"
on public.creator_categories
for all
to authenticated
using (auth.uid() = creator_id)
with check (auth.uid() = creator_id);

drop policy if exists "creator_samples_select" on public.creator_samples;
create policy "creator_samples_select"
on public.creator_samples
for select
to authenticated
using (true);

drop policy if exists "creator_samples_write_own" on public.creator_samples;
create policy "creator_samples_write_own"
on public.creator_samples
for all
to authenticated
using (auth.uid() = creator_id)
with check (auth.uid() = creator_id);

drop policy if exists "requests_select_participants" on public.requests;
create policy "requests_select_participants"
on public.requests
for select
to authenticated
using (auth.uid() = student_id or auth.uid() = creator_id);

drop policy if exists "requests_insert_student" on public.requests;
create policy "requests_insert_student"
on public.requests
for insert
to authenticated
with check (auth.uid() = student_id);

drop policy if exists "requests_update_participants" on public.requests;
create policy "requests_update_participants"
on public.requests
for update
to authenticated
using (auth.uid() = student_id or auth.uid() = creator_id)
with check (auth.uid() = student_id or auth.uid() = creator_id);

drop policy if exists "offers_select_participants" on public.offers;
create policy "offers_select_participants"
on public.offers
for select
to authenticated
using (
  exists (
    select 1 from public.requests r
    where r.id = offers.request_id
    and (auth.uid() = r.student_id or auth.uid() = r.creator_id)
  )
);

drop policy if exists "offers_insert_participants" on public.offers;
create policy "offers_insert_participants"
on public.offers
for insert
to authenticated
with check (
  auth.uid() = actor_id
  and exists (
    select 1 from public.requests r
    where r.id = offers.request_id
    and (auth.uid() = r.student_id or auth.uid() = r.creator_id)
  )
);

drop policy if exists "orders_select_participants" on public.orders;
create policy "orders_select_participants"
on public.orders
for select
to authenticated
using (auth.uid() = student_id or auth.uid() = creator_id);

drop policy if exists "orders_insert_student" on public.orders;
create policy "orders_insert_student"
on public.orders
for insert
to authenticated
with check (auth.uid() = student_id);

drop policy if exists "orders_update_participants" on public.orders;
create policy "orders_update_participants"
on public.orders
for update
to authenticated
using (auth.uid() = student_id or auth.uid() = creator_id)
with check (auth.uid() = student_id or auth.uid() = creator_id);
