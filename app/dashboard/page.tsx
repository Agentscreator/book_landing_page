import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { db } from "@/db"
import { bookings } from "@/db/schema"
import { eq, desc, sql } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"

export default async function DashboardPage() {
  const user = await getSession()
  
  if (!user) {
    redirect("/auth")
  }

  // Fetch user's bookings
  const userBookings = await db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, user.id))
    .orderBy(desc(bookings.createdAt))
    .limit(10)

  // Calculate earnings
  const earningsResult = await db
    .select({
      total: sql<number>`COALESCE(SUM(CAST(${bookings.price} AS DECIMAL)), 0)`,
      monthly: sql<number>`COALESCE(SUM(CASE WHEN ${bookings.createdAt} >= date_trunc('month', CURRENT_DATE) THEN CAST(${bookings.price} AS DECIMAL) ELSE 0 END), 0)`,
    })
    .from(bookings)
    .where(eq(bookings.userId, user.id))

  const totalEarnings = Number(earningsResult[0]?.total || 0)
  const monthlyEarnings = Number(earningsResult[0]?.monthly || 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">
              Your booking site is live and accepting clients.
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Status Card - Most Important */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <CardTitle>
              {user.stripeConnected ? "Payouts connected ✅" : "Get paid automatically"}
            </CardTitle>
            <CardDescription>
              {user.stripeConnected
                ? "Payments are sent directly to your bank after each booking."
                : "Connect your payouts to receive money directly to your bank account."}
            </CardDescription>
          </CardHeader>
          {!user.stripeConnected && (
            <CardContent>
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span>⏱ Takes ~3 minutes</span>
                <span>🔒 Secure via Stripe</span>
              </div>
              <Button size="lg">Connect payouts</Button>
            </CardContent>
          )}
        </Card>

        {/* Bookings Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {userBookings.length === 0 ? (
              <p className="text-muted-foreground">
                No bookings yet. Your site is live — new bookings will appear here automatically.
              </p>
            ) : (
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.clientName}</p>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.price}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Earnings Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">This month:</span>
                <span className="font-semibold">${monthlyEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total booked:</span>
                <span className="font-semibold">${totalEarnings.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Payouts are handled automatically. You keep 95% of every booking.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Questions or changes? Contact me directly at{" "}
            <a href="mailto:joshnathbrown884@gmail.com" className="underline">
              joshnathbrown884@gmail.com
            </a>{" "}
            or send me a text at{" "}
            <a href="tel:336-639-6478" className="underline">
              336-639-6478
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
