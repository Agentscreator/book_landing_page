import { cookies } from 'next/headers'

export interface User {
  id: number
  name: string
  email: string
  websiteUrl: string | null
  stripeConnected: boolean
  stripeAccountId: string | null
}

export async function hashPassword(password: string): Promise<string> {
  // Simple hash for demo - in production use bcrypt
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function createSession(user: User) {
  const sessionData = JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    websiteUrl: user.websiteUrl,
    stripeConnected: user.stripeConnected,
    stripeAccountId: user.stripeAccountId,
  })

  const cookieStore = await cookies()
  cookieStore.set('session', sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    if (!session) return null
    return JSON.parse(session.value)
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
