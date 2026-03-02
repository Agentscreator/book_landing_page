# Website Assignment Guide

This guide explains how to manage website assignments for clients in your multi-tenant booking system.

## Overview

Clients now start with NO website assigned when they first sign up. You can manually assign websites to their dashboard as needed.

## Database Changes

A new `website_url` column has been added to the `users` table:
- Nullable field (clients start with `null`)
- Stores the assigned booking website URL
- Displayed in the client's dashboard once assigned

## How to Assign a Website

### Option 1: Using the Migration Script (Recommended)

1. First, push the schema changes to your database:
```bash
pnpm db:push
```

2. Run the SQL migration to add the column and assign the website:
```bash
psql $DATABASE_URL -f migrations/add-website-url.sql
```

### Option 2: Using the TypeScript Script

1. Install tsx if you don't have it:
```bash
pnpm add -D tsx
```

2. Run the assignment script:
```bash
pnpm tsx scripts/assign-website.ts
```

### Option 3: Manual Database Update

Connect to your database and run:
```sql
-- Add the column (if not already added)
ALTER TABLE users ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Assign website to specific user
UPDATE users 
SET website_url = 'https://tbh.booknails.tech' 
WHERE email = 'agentverse884@gmail.com';
```

## User Experience

### New Users
- Sign up normally through `/auth`
- Dashboard shows "Website Not Assigned" message
- Cannot access booking functionality until website is assigned

### After Assignment
- Dashboard displays their assigned website URL
- "Copy Link" button to share with clients
- Full access to bookings and earnings for that website

## Current Assignment

The following user has been assigned a website:
- **Email**: agentverse884@gmail.com
- **Website**: https://tbh.booknails.tech
- **Database**: Same as this application (shared database)

## New Features

### Password Visibility Toggle
- Eye icon button on login/signup forms
- Click to show/hide password
- Improves user experience during authentication

### Dashboard Updates
- Shows assigned website prominently at the top
- "Visit Site" and "Copy Link" buttons for easy access
- Clear messaging when no website is assigned

## To Assign More Websites

Edit `scripts/assign-website.ts` and change:
```typescript
const email = 'user@example.com'  // Target user email
const websiteUrl = 'https://their-site.com'  // Their website URL
```

Then run the script again.

## Technical Details

- Schema: `db/schema.ts` - Added `websiteUrl` field
- Auth: `lib/auth.ts` - Updated User interface and session
- Dashboard: `app/dashboard/page.tsx` - Shows website assignment
- Login: `app/auth/page.tsx` - Added password visibility toggle
