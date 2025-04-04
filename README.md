## References
Tanstack Router https://tanstack.com/router/v1/docs/framework/react/routing/file-based-routing  

## Dashboard Links

- [Supabase Dashboard](https://supabase.com/dashboard/project/tkkievrjkmaucvjntagb)
- [Mapbox Dashboard](https://console.mapbox.com/)

## Development setup

1. Install dependencies
```bash
npm install
```

2. Install Supabase CLI  
```bash
# For macOS
brew install supabase/tap/supabase
```

3. Login to Supabase
```bash
supabase login
```

4. Start local development
```bash
# If there are new migrations (either created by you or committed by others)
supabase db reset

# Otherwise, just start Supabase
supabase start
# if above doesn't work for your environment,
supabase start --ignore-health-check

# Start the application
npm start
```

5. Fill your .env based on local supabase setup guide.  
```
Studio URL: http://127.0.0.1:54323
API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Inbucket URL: http://127.0.0.1:54324
JWT secret: 
anon key: 
service_role key: 
S3 Access Key: 
S3 Secret Key: 
S3 Region: local
```

## Create a Migration
There are two ways to make schema changes:

### 1. Manual Migration
```bash
# Creating a new migration
supabase migration new your_migration_name

# This creates a new file: supabase/migrations/<timestamp>_your_migration_name.sql
# Edit this file with your SQL statements, for example:
# create table public.employees (
#   id integer primary key generated always as identity,
#   name text
# );
```

### 2. Auto Schema Diff
You can make changes through the Studio UI (localhost:54323) and auto-generate a migration:

1. Make your schema changes in the Studio UI
2. Generate a migration file:
```bash
# Generate migration from schema changes
supabase db diff -f your_migration_name

# Alternatively, for more concise output:
supabase db diff --use-migra -f your_migration_name
```

### Applying Migrations
After creating migrations (either manually or auto-generated), apply them to your local database:
```bash
supabase db reset
```

[Learn more about creating migrations →](https://supabase.com/docs/guides/deployment/managing-environments#create-a-new-migration)


## Stopping local supabase instance  
```bash
# To halt Supabase instance (without resetting data)
supabase stop
```

## FAQ
### Container name is already in use
If you encounter an error like "The container name is already in use", follow these steps:
```bash
# First, stop the Supabase instance
supabase stop

# Then start it again
supabase start
# or if needed
supabase start --ignore-health-check
```