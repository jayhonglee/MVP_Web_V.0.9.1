-- Seed data for hangout_categories table
INSERT INTO public.hangout_categories (id) VALUES
    ('food-drinks'),
    ('sports'),
    ('books-study'),
    ('travel-outdoor'),
    ('art-crafting'),
    ('local-chat')
ON CONFLICT (id) DO NOTHING;  