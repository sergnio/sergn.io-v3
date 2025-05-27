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

-- Grinder model table (shared metadata)
create table grinder_model (
         id uuid primary key default gen_random_uuid(),
         type grinder_type not null
);

-- Grinder table (user-specific grinder config)
create table grinder (
     id uuid primary key default gen_random_uuid(),
     grinder_model_id uuid references grinder_model(id) not null,
     number integer,
     rotations integer,
     setting integer,
     constraint grinder_field_check check (
       (number is not null and rotations is not null and setting is null) or
       (number is null and rotations is null and setting is not null)
       )
);

-- Brew method table (deduplicated)
create table brew_method (
       id uuid primary key default gen_random_uuid(),
       name text not null unique
);

-- Bridge table for coffee <> brew_method (many-to-many)
create table coffee_brew_method (
    id uuid primary key default gen_random_uuid(),
    coffee_id uuid references coffee(id) on delete cascade,
    brew_method_id uuid references brew_method(id),
    grinder_id uuid
);

