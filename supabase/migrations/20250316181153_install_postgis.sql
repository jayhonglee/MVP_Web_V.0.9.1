-- Create the postgis schema
CREATE SCHEMA IF NOT EXISTS postgis;

-- Install PostGIS extension in the postgis schema
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA postgis;

-- Grant usage on the schema to authenticated users and anon users
GRANT USAGE ON SCHEMA postgis TO authenticated, anon;

-- Grant execute on all functions in the postgis schema to authenticated users and anon users
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA postgis TO authenticated, anon;
