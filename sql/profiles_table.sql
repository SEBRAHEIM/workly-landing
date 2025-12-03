create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text check (role in ('student', 'creator')),
  username text,
  full_name text,
  nationality text,
  whatsapp text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy if not exists "Users can view own profile"
on profiles for select
using (auth.uid() = id);

create policy if not exists "Users can insert own profile"
on profiles for insert
with check (auth.uid() = id);

create policy if not exists "Users can update own profile"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
