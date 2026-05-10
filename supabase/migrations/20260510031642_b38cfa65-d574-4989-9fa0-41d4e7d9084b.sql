
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'corporate',
  company text not null,
  title text not null,
  date_applied date not null default current_date,
  status text not null default 'applied',
  interview_date date,
  salary text,
  platform text,
  link text,
  notes text,
  priority text not null default 'medium',
  history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

create policy "own select" on public.job_applications for select using (auth.uid() = user_id);
create policy "own insert" on public.job_applications for insert with check (auth.uid() = user_id);
create policy "own update" on public.job_applications for update using (auth.uid() = user_id);
create policy "own delete" on public.job_applications for delete using (auth.uid() = user_id);

create index job_applications_user_idx on public.job_applications(user_id, date_applied desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger job_applications_updated
before update on public.job_applications
for each row execute function public.set_updated_at();
