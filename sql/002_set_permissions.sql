/**
 * Coffee table
 */
alter table coffee enable row level security;

create policy "Public read access"
on coffee
for select
               to public
               using (true);

create policy "Admin-only write access"
on coffee
for all
to authenticated
using (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140')
with check (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140');

/**
 * Bag size table
 */
       alter table bag_size enable row level security;

create policy "Public read access"
on bag_size
for select
               to public
               using (true);

create policy "Admin-only write access"
on bag_size
for all
to authenticated
using (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140')
with check (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140');

/**
 * Brew method table
 */
alter table brew_method enable row level security;

create policy "Public read access"
on brew_method
for select
               to public
               using (true);

create policy "Admin-only write access"
on brew_method
for all
to authenticated
using (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140')
with check (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140');

/**
 * Brew method table
 */
alter table grinder enable row level security;

create policy "Public read access"
on grinder
for select
               to public
               using (true);

create policy "Admin-only write access"
on grinder
for all
to authenticated
using (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140')
with check (auth.uid() = 'b0e93ea4-a886-45ef-8431-192c86afa140');

