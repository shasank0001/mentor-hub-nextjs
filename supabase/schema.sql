-- PrepMentor Hub - Supabase schema
-- Run this script in the Supabase SQL editor after creating the project.

-- Enable helper extensions (safe to run multiple times)
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Shared helper to keep updated_at columns in sync
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at := timezone('utc', now());
    return new;
end;
$$;

-- Profiles table extends auth.users
create table if not exists public.profiles (
    id uuid primary key references auth.users on delete cascade,
    full_name text,
    role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
    prelims_access boolean not null default false,
    mains_access boolean not null default false,
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Payments table stores Razorpay transactions and audit trail
create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    exam_type text not null check (exam_type in ('prelims', 'mains')),
    amount integer not null,
    currency text not null default 'INR',
    razorpay_order_id text,
    razorpay_payment_id text,
    razorpay_signature text,
    idempotency_key text,
    status text not null default 'pending' check (status in ('pending', 'completed', 'failed')),
    failure_reason text,
    order_payload jsonb not null default '{}'::jsonb,
    verification_payload jsonb not null default '{}'::jsonb,
    webhook_payload jsonb not null default '{}'::jsonb,
    verified_at timestamp with time zone,
    access_granted_at timestamp with time zone,
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Multiple choice question bank
create table if not exists public.prelims_questions (
    id uuid primary key default uuid_generate_v4(),
    prompt text not null,
    option_a text not null,
    option_b text not null,
    option_c text not null,
    option_d text not null,
    correct_option smallint not null check (correct_option between 0 and 3),
    difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
    topic text,
    marks integer not null default 1,
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Descriptive question bank
create table if not exists public.mains_questions (
    id uuid primary key default uuid_generate_v4(),
    prompt text not null,
    marks integer not null,
    expected_length text,
    topic text,
    difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
    sample_answer text,
    evaluation_criteria text,
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Prelims test sessions
create table if not exists public.prelims_attempts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    attempt_number smallint not null check (attempt_number between 1 and 2),
    question_ids uuid[] not null,
    answers jsonb not null default '[]'::jsonb,
    status text not null default 'in_progress' check (status in ('in_progress', 'paused', 'submitted')),
    started_at timestamp with time zone not null default timezone('utc', now()),
    submitted_at timestamp with time zone,
    time_remaining integer,
    score integer,
    total_questions integer,
    percentage numeric(5,2),
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Mains submissions metadata
create table if not exists public.mains_submissions (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    question_id uuid not null references public.mains_questions(id) on delete cascade,
    file_path text not null,
    storage_key text not null,
    original_filename text not null,
    content_type text,
    file_size integer,
    compressed_size integer,
    checksum text,
    client_metadata jsonb not null default '{}'::jsonb,
    status text not null default 'pending' check (status in ('pending', 'under_review', 'evaluated')),
    score integer,
    feedback text,
    assigned_to uuid references public.profiles(id) on delete set null,
    evaluated_by uuid references public.profiles(id) on delete set null,
    evaluated_at timestamp with time zone,
    retention_expires_at timestamp with time zone,
    created_at timestamp with time zone not null default timezone('utc', now()),
    updated_at timestamp with time zone not null default timezone('utc', now())
);

-- Ensure new columns exist when the script is re-run (idempotent guards)
alter table public.payments
    alter column currency set not null,
    alter column created_at set default timezone('utc', now()),
    alter column updated_at set default timezone('utc', now());

alter table public.payments
    add column if not exists idempotency_key text,
    add column if not exists failure_reason text,
    add column if not exists order_payload jsonb not null default '{}'::jsonb,
    add column if not exists verification_payload jsonb not null default '{}'::jsonb,
    add column if not exists webhook_payload jsonb not null default '{}'::jsonb,
    add column if not exists verified_at timestamp with time zone,
    add column if not exists access_granted_at timestamp with time zone;

update public.prelims_questions
set difficulty = 'medium'
where difficulty is null;

alter table public.prelims_questions
    alter column difficulty set default 'medium',
    alter column difficulty set not null;

update public.mains_questions
set difficulty = 'medium'
where difficulty is null;

alter table public.mains_questions
    alter column difficulty set default 'medium',
    alter column difficulty set not null;

update public.profiles
set prelims_access = false
where prelims_access is null;

update public.profiles
set mains_access = false
where mains_access is null;

alter table public.profiles
    alter column prelims_access set default false,
    alter column prelims_access set not null,
    alter column mains_access set default false,
    alter column mains_access set not null,
    alter column created_at set default timezone('utc', now()),
    alter column updated_at set default timezone('utc', now());

alter table public.prelims_attempts
    add column if not exists created_at timestamp with time zone not null default timezone('utc', now()),
    add column if not exists updated_at timestamp with time zone not null default timezone('utc', now());

update public.prelims_attempts
set answers = '[]'::jsonb
where answers is null;

alter table public.prelims_attempts
    alter column answers set default '[]'::jsonb,
    alter column answers set not null;

alter table public.mains_submissions
    add column if not exists storage_key text,
    add column if not exists original_filename text,
    add column if not exists content_type text,
    add column if not exists compressed_size integer,
    add column if not exists checksum text,
    add column if not exists client_metadata jsonb not null default '{}'::jsonb,
    add column if not exists assigned_to uuid references public.profiles(id) on delete set null,
    add column if not exists updated_at timestamp with time zone not null default timezone('utc', now());

alter table public.mains_submissions
    alter column retention_expires_at set default timezone('utc', now()) + interval '36 days';

update public.mains_submissions
set storage_key = coalesce(storage_key, file_path)
where storage_key is null;

update public.mains_submissions
set original_filename = coalesce(original_filename, file_path)
where original_filename is null;

alter table public.mains_submissions
    alter column storage_key set not null;

alter table public.mains_submissions
    alter column original_filename set not null;

update public.mains_submissions
set client_metadata = '{}'::jsonb
where client_metadata is null;

alter table public.mains_submissions
    alter column client_metadata set default '{}'::jsonb,
    alter column client_metadata set not null;

update public.mains_submissions
set retention_expires_at = timezone('utc', now()) + interval '36 days'
where retention_expires_at is null;

-- Helpful indexes for hot paths
create index if not exists idx_payments_user_status on public.payments (user_id, status, created_at desc);
create unique index if not exists uniq_payments_idempotency_key on public.payments (idempotency_key) where idempotency_key is not null;

create index if not exists idx_prelims_attempts_user_status on public.prelims_attempts (user_id, status);

create index if not exists idx_mains_submissions_user_status on public.mains_submissions (user_id, status, retention_expires_at);
create unique index if not exists uniq_mains_submissions_storage_key on public.mains_submissions (storage_key);

-- Keep updated_at timestamps fresh
drop trigger if exists set_updated_at_on_profiles on public.profiles;
create trigger set_updated_at_on_profiles
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_on_payments on public.payments;
create trigger set_updated_at_on_payments
before update on public.payments
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_on_prelims_questions on public.prelims_questions;
create trigger set_updated_at_on_prelims_questions
before update on public.prelims_questions
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_on_mains_questions on public.mains_questions;
create trigger set_updated_at_on_mains_questions
before update on public.mains_questions
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_on_prelims_attempts on public.prelims_attempts;
create trigger set_updated_at_on_prelims_attempts
before update on public.prelims_attempts
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_on_mains_submissions on public.mains_submissions;
create trigger set_updated_at_on_mains_submissions
before update on public.mains_submissions
for each row
execute function public.set_updated_at();

-- Basic Row Level Security policies (placeholders - adjust during auth integration)
alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.prelims_questions enable row level security;
alter table public.mains_questions enable row level security;
alter table public.prelims_attempts enable row level security;
alter table public.mains_submissions enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
    on public.profiles
    for select
    using (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
    on public.profiles
    for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

drop policy if exists "Payments are readable by owner" on public.payments;
create policy "Payments are readable by owner"
    on public.payments
    for select
    using (auth.uid() = user_id);

drop policy if exists "Payments are insertable by owner" on public.payments;
create policy "Payments are insertable by owner"
    on public.payments
    for insert
    with check (auth.uid() = user_id);

drop policy if exists "Prelims attempts are manageable by owner" on public.prelims_attempts;
create policy "Prelims attempts are manageable by owner"
    on public.prelims_attempts
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

drop policy if exists "Mains submissions are manageable by owner" on public.mains_submissions;
create policy "Mains submissions are manageable by owner"
    on public.mains_submissions
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Additional mentor/admin policies should be added during Phase 3 security hardening.
