import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { db } from '@/db'
import { bookings, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update booking status to paid
        if (session.metadata?.bookingId) {
          await db
            .update(bookings)
            .set({ status: 'paid' })
            .where(eq(bookings.id, parseInt(session.metadata.bookingId)))
        }
        
        console.log('Checkout session completed:', session.id)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update booking status to paid
        if (paymentIntent.metadata?.bookingId) {
          await db
            .update(bookings)
            .set({ status: 'paid' })
            .where(eq(bookings.id, parseInt(paymentIntent.metadata.bookingId)))
        }
        
        console.log('Payment succeeded:', paymentIntent.id)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update booking status to failed
        if (paymentIntent.metadata?.bookingId) {
          await db
            .update(bookings)
            .set({ status: 'failed' })
            .where(eq(bookings.id, parseInt(paymentIntent.metadata.bookingId)))
        }
        
        console.log('Payment failed:', paymentIntent.id)
        break
      }

      case 'account.updated': {
        const account = event.data.object as Stripe.Account
        
        // Update user's Stripe connection status
        const isConnected = account.charges_enabled && account.payouts_enabled
        
        await db
          .update(users)
          .set({
            stripeConnected: isConnected,
            stripeAccountId: account.id,
          })
          .where(eq(users.stripeAccountId, account.id))
        
        console.log('Account updated:', account.id, 'Connected:', isConnected)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        
        // Update booking status to refunded
        if (charge.metadata?.bookingId) {
          await db
            .update(bookings)
            .set({ status: 'refunded' })
            .where(eq(bookings.id, parseInt(charge.metadata.bookingId)))
        }
        
        console.log('Charge refunded:', charge.id)
        break
      }

      default:
        console.log('Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
