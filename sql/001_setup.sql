-- ENUM for brew method
create type brew_method_name as enum ('Moka Pot', 'Filter', 'v60', 'Espresso');

-- ENUM for grinder type
create type grinder_type as enum ('Manual', 'Niche Zero');

-- Bag size table
create table bag_size (
  id uuid primary key default gen_random_uuid(),
  oz integer,
  g integer,
  constraint check_only_one_size check (
      (oz is not null and g is null) or
      (oz is null and g is not null)
      )
);

-- Coffee table
create table coffee (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    bought_from text,
    price numeric,
    bag_size_id uuid references bag_size(id),
    image text
);

-- Grinder table
create table grinder (
     id uuid primary key default gen_random_uuid(),
     type grinder_type not null,
     number integer,
     rotations integer,
     setting integer,
    -- constraint: only certain fields based on grinder type
     constraint grinder_field_check check (
         (type = 'Manual' and number is not null and rotations is not null and setting is null) or
         (type = 'Niche Zero' and setting is not null and number is null and rotations is null)
         )
);

-- Brew methods per coffee
create table brew_method (
     id uuid primary key default gen_random_uuid(),
     coffee_id uuid references coffee(id),
     name brew_method_name not null,
     grinder_id uuid references grinder(id)
);

