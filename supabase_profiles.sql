-- PROFILES TABLE
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  role text not null check (role in ('student', 'creator')),
  created_at timestamp with time zone default now()
);

-- ENABLE RLS
alter table profiles enable row level security;

-- READ OWN PROFILE
create policy "read own profile"
on profiles for select
using (auth.uid() = id);

-- INSERT OWN PROFILE
create policy "insert own profile"
on profiles for insert
with check (auth.uid() = id);
