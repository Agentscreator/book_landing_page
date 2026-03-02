import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { users } from '../db/schema.ts'
import { eq } from 'drizzle-orm'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function addWebsiteColumn() {
  try {
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      throw new Error('DATABASE_URL not found in environment variables')
    }

    const client = postgres(connectionString)
    const db = drizzle(client)

    console.log('Adding website_url column to users table...')
    
    // Add the column if it doesn't exist
    await client`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS website_url TEXT
    `

    console.log('✅ Column added successfully!')

    // Assign website to specific user
    console.log('\nAssigning website to agentverse884@gmail.com...')
    
    const result = await client`
      UPDATE users 
      SET website_url = 'https://tbh.booknails.tech'
      WHERE email = 'agentverse884@gmail.com'
      RETURNING *
    `

    if (result.length > 0) {
      console.log('✅ Website assigned successfully!')
      console.log('   User:', result[0].email)
      console.log('   Website:', result[0].website_url)
    } else {
      console.log('⚠️  User with email agentverse884@gmail.com not found')
      console.log('   Make sure the user has signed up first')
    }

    await client.end()
    console.log('\n✅ Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

addWebsiteColumn()
