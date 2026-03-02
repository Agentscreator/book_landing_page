import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

// Get command line arguments
const args = process.argv.slice(2)

if (args.length !== 2) {
  console.log('Usage: pnpm tsx scripts/assign-website-cli.ts <email> <website-url>')
  console.log('Example: pnpm tsx scripts/assign-website-cli.ts user@example.com https://example.com')
  process.exit(1)
}

const [email, websiteUrl] = args

async function assignWebsite() {
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
      process.exit(1)
    }

    console.log(`\n✅ Successfully assigned website to user:`)
    console.log(`   Email: ${result[0].email}`)
    console.log(`   Name: ${result[0].name}`)
    console.log(`   Website: ${result[0].websiteUrl}`)
    console.log(`\nThe user can now see their assigned website in the dashboard.`)
  } catch (error) {
    console.error('❌ Error assigning website:', error)
    process.exit(1)
  }

  process.exit(0)
}

assignWebsite()
