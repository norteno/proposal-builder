create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled Proposal',
  client_name text not null default 'New Client',
  slug text not null unique,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_proposals_updated_at on proposals;

create trigger update_proposals_updated_at
before update on proposals
for each row
execute function update_updated_at_column();

alter table proposals enable row level security;

drop policy if exists "Allow public read proposals" on proposals;
drop policy if exists "Allow public insert proposals" on proposals;
drop policy if exists "Allow public update proposals" on proposals;
drop policy if exists "Allow public delete proposals" on proposals;

create policy "Allow public read proposals"
on proposals for select
using (true);

create policy "Allow public insert proposals"
on proposals for insert
with check (true);

create policy "Allow public update proposals"
on proposals for update
using (true)
with check (true);

create policy "Allow public delete proposals"
on proposals for delete
using (true);
