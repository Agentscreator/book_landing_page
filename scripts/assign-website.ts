import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function assignWebsite() {
  const email = 'agentverse884@gmail.com'
  const websiteUrl = 'https://tbh.booknails.tech'

  // Create a new connection for this script
  const connectionString = process.env.DATABASE_URL!
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables')
    process.exit(1)
  }

  const client = postgres(connectionString, { max: 1 })
  const db = drizzle(client)

  try {
    console.log(`🔍 Looking for user with email: ${email}`)
    
    const result = await db
      .update(users)
      .set({ websiteUrl })
      .where(eq(users.email, email))
      .returning()

    if (result.length === 0) {
      console.log(`❌ User with email ${email} not found`)
      console.log(`\nPlease make sure the user has signed up first.`)
      await client.end()
      process.exit(1)
    }

    console.log(`\n✅ Successfully assigned website to user:`)
    console.log(`   Email: ${result[0].email}`)
    console.log(`   Name: ${result[0].name}`)
    console.log(`   Website: ${result[0].websiteUrl}`)
    console.log(`\nThe user can now see their assigned website in the dashboard.`)
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error assigning website:', error)
    await client.end()
    process.exit(1)
  }
}

assignWebsite()
