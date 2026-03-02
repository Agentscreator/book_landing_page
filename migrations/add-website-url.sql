-- Add website_url column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Assign website to specific user
UPDATE users 
SET website_url = 'https://tbh.booknails.tech' 
WHERE email = 'agentverse884@gmail.com';
