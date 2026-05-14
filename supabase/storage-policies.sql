-- Create a public bucket named proposal-assets in the Supabase dashboard first.
-- Then run these policies if uploads/downloads are blocked.

create policy "Allow public asset uploads"
on storage.objects for insert
with check (bucket_id = 'proposal-assets');

create policy "Allow public asset reads"
on storage.objects for select
using (bucket_id = 'proposal-assets');

create policy "Allow public asset updates"
on storage.objects for update
using (bucket_id = 'proposal-assets')
with check (bucket_id = 'proposal-assets');

create policy "Allow public asset deletes"
on storage.objects for delete
using (bucket_id = 'proposal-assets');
