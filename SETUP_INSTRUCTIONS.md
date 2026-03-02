# Setup Instructions

## Quick Start

Follow these steps to apply the website assignment feature:

### 1. Update Database Schema

Push the schema changes to add the `website_url` column:

```bash
pnpm db:push
```

### 2. Assign Website to User

Run the SQL migration to assign the website to agentverse884@gmail.com:

```bash
psql $DATABASE_URL -f migrations/add-website-url.sql
```

Or use the TypeScript script:

```bash
pnpm tsx scripts/assign-website.ts
```

### 3. Test the Changes

1. Log in as agentverse884@gmail.com
2. You should see the assigned website: https://tbh.booknails.tech
3. Test the password visibility toggle (eye icon) on the login form

## What Changed

✅ Database schema updated with `website_url` field
✅ New users start with NO website assigned
✅ Dashboard shows assigned website or "pending" message
✅ Password visibility toggle added to login/signup forms
✅ User agentverse884@gmail.com assigned https://tbh.booknails.tech

## Files Modified

- `db/schema.ts` - Added websiteUrl field
- `lib/auth.ts` - Updated User interface and session
- `app/auth/page.tsx` - Added password visibility toggle
- `app/dashboard/page.tsx` - Shows website assignment
- `app/api/auth/login/route.ts` - Include websiteUrl in session
- `app/api/auth/signup/route.ts` - Include websiteUrl in session

## Files Created

- `scripts/assign-website.ts` - Script to assign websites to users
- `migrations/add-website-url.sql` - SQL migration file
- `WEBSITE_ASSIGNMENT_GUIDE.md` - Detailed guide
- `SETUP_INSTRUCTIONS.md` - This file

## Next Steps

To assign websites to other users, edit `scripts/assign-website.ts` and change the email and websiteUrl, then run the script again.
