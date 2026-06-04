-- Philippine Law AI Companion — Supabase Schema
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard

-- ─── Enable UUID extension ───────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── Profiles ────────────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid references auth.users on delete cascade primary key,
  display_name  text not null default 'Counsel',
  bar_year      text not null default '2026',
  avatar_url    text,
  updated_at    timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can manage own profile"
  on profiles for all using (auth.uid() = id);

-- ─── Progression (XP, achievements, survival streak) ─────────────────────────
create table if not exists progression (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users on delete cascade not null unique,
  xp                  integer not null default 0,
  unlocked_achievements text[] not null default '{}',
  recitation_current  integer not null default 0,
  recitation_best     integer not null default 0,
  recitation_total    integer not null default 0,
  irac_count          integer not null default 0,
  issue_count         integer not null default 0,
  codal_count         integer not null default 0,
  daily_targets       jsonb not null default '{"minutes":30,"flashcards":10,"barQuestions":5}',
  updated_at          timestamptz default now()
);
alter table progression enable row level security;
create policy "Users can manage own progression"
  on progression for all using (auth.uid() = user_id);

-- ─── SRS card states ─────────────────────────────────────────────────────────
create table if not exists srs_states (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users on delete cascade not null,
  card_id       text not null,
  state         text not null default 'new',
  interval      integer not null default 1,
  ease_factor   real not null default 2.5,
  due_date      text not null default '',
  review_count  integer not null default 0,
  updated_at    timestamptz default now(),
  unique (user_id, card_id)
);
alter table srs_states enable row level security;
create policy "Users can manage own SRS states"
  on srs_states for all using (auth.uid() = user_id);

-- ─── Activity log ─────────────────────────────────────────────────────────────
create table if not exists activity_log (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users on delete cascade not null,
  date          text not null,
  minutes       integer not null default 0,
  cards         integer not null default 0,
  bar_questions integer not null default 0,
  recitations   integer not null default 0,
  issue_spots   integer not null default 0,
  updated_at    timestamptz default now(),
  unique (user_id, date)
);
alter table activity_log enable row level security;
create policy "Users can manage own activity"
  on activity_log for all using (auth.uid() = user_id);

-- ─── Bar review sessions ──────────────────────────────────────────────────────
create table if not exists bar_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  client_key  text not null,
  mode_label  text,
  subject     text,
  score       integer not null default 0,
  q_count     integer not null default 0,
  created_at  timestamptz not null default now(),
  unique (user_id, client_key)
);
alter table bar_sessions enable row level security;
create policy "Users can manage own bar sessions"
  on bar_sessions for all using (auth.uid() = user_id);

-- ─── Recitation sessions ──────────────────────────────────────────────────────
create table if not exists recitation_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  client_key  text not null,
  professor   text,
  subject     text,
  score       integer not null default 0,
  q_count     integer not null default 0,
  created_at  timestamptz not null default now(),
  unique (user_id, client_key)
);
alter table recitation_sessions enable row level security;
create policy "Users can manage own recitation sessions"
  on recitation_sessions for all using (auth.uid() = user_id);

-- ─── AI chat history ──────────────────────────────────────────────────────────
create table if not exists ai_messages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  message_id  text not null,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  subject     text not null default 'all',
  created_at  timestamptz not null default now(),
  unique (user_id, message_id)
);
alter table ai_messages enable row level security;
create policy "Users can manage own AI messages"
  on ai_messages for all using (auth.uid() = user_id);

-- ─── Bookmarks ────────────────────────────────────────────────────────────────
create table if not exists bookmarks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade not null,
  type        text not null check (type in ('codal', 'flashcard', 'bar', 'topic')),
  ref_id      text not null,
  subject     text not null default '',
  title       text not null default '',
  note        text not null default '',
  created_at  timestamptz not null default now(),
  unique (user_id, type, ref_id)
);
alter table bookmarks enable row level security;
create policy "Users can manage own bookmarks"
  on bookmarks for all using (auth.uid() = user_id);

-- ─── Auto-create profile on sign-up ──────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Counsel'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
