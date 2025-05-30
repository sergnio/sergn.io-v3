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
    bought_from text not null,
    price numeric not null,
    bag_size_id uuid references bag_size(id) not null,
    image_url text
);

-- Grinder_settings model table (shared metadata)
create table grinder_model (
         id uuid primary key default gen_random_uuid(),
         type grinder_type not null
);

-- Grinder_settings table (user-specific grinder_settings config)
create table grinder_settings (
     id uuid primary key default gen_random_uuid(),
     grinder_model_id uuid references grinder_settings_model(id) not null,
     number integer,
     rotations integer,
     setting integer
     constraint grinder_settings_field_check check (
       (number is not null and rotations is not null and setting is null) or
       (number is null and rotations is null and setting is not null)
       )
);

-- Brew method table (deduplicated)
create table brew_method (
       id uuid primary key default gen_random_uuid(),
       name text not null unique
);

-- Bridge table for coffee <> brew_method <> grinder_settings (many-to-many)
create table coffee_brew_method (
    coffee_id uuid references coffee(id) on delete cascade,
    brew_method_id uuid references brew_method(id),
    grinder_settings_id uuid references grinder_settings(id),
    primary key (coffee_id, brew_method_id, grinder_settings_id)
);
