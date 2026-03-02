# Database Migration Scripts

## Add Website Column Migration

This script adds the `website_url` column to the users table and assigns a website to a specific user.

### Usage

```bash
npm run migrate:website
```

or

```bash
pnpm migrate:website
```

### What it does

1. Adds a `website_url` column to the `users` table (if it doesn't exist)
2. Assigns the website `https://tbh.booknails.tech` to the user with email `agentverse884@gmail.com`

### Requirements

- Make sure your `.env.local` file has the `DATABASE_URL` configured
- The user with email `agentverse884@gmail.com` must exist in the database (they need to sign up first)

### Manual Assignment

To manually assign a website to a different user, you can run this SQL query:

```sql
UPDATE users 
SET website_url = 'https://your-website-url.com'
WHERE email = 'user@example.com';
```
