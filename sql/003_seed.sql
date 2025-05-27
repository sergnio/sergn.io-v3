insert into grinder_model (id, type)
values
    (gen_random_uuid(),  'Manual'),
    (gen_random_uuid(),  'Niche Zero');

-- Ensure brew methods exist
INSERT INTO brew_method (id, name)
VALUES
    (gen_random_uuid(), 'Moka Pot'),
    (gen_random_uuid(), 'v60')
    ON CONFLICT (name) DO NOTHING;


-- Insert grinder settings for v60
INSERT INTO grinder_settings (id, grinder_model_id, number, rotations, setting)
VALUES (
           gen_random_uuid(),
           (SELECT id FROM grinder_model WHERE type = 'Manual' LIMIT 1),
    4,
    1,
    null
    );

-- Link v60 brew method to coffee
INSERT INTO coffee_brew_method (coffee_id, brew_method_id, grinder_settings_id)
VALUES (
           (select id from coffee where name = 'Colombia Perky'),
           (select id from brew_method where name = 'v60'),
           (select id from grinder_settings where grinder_model_id =
                                                  (select id from grinder_model where type = 'Manual'))
       );
