import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../db/schema'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function listUsers() {
  const connectionString = process.env.DATABASE_URL!
  
  if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables')
    process.exit(1)
  }

  const client = postgres(connectionString, { max: 1 })
  const db = drizzle(client)

  try {
    console.log('📋 Fetching all users...\n')
    
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      websiteUrl: users.websiteUrl,
      createdAt: users.createdAt,
    }).from(users)

    if (allUsers.length === 0) {
      console.log('No users found in the database.')
      console.log('Users need to sign up first at /auth')
    } else {
      console.log(`Found ${allUsers.length} user(s):\n`)
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`)
        console.log(`   Website: ${user.websiteUrl || 'Not assigned'}`)
        console.log(`   Created: ${user.createdAt}`)
        console.log('')
      })
    }
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    await client.end()
    process.exit(1)
  }
}

listUsers()
