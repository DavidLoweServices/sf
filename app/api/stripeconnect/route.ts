// This file is using the App Router's Route Handlers
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {
  try {
    const accountId = "acct_1NqYNHQp8cCADs7w" // Replace with actual account ID

    const accountSession = await stripe.accountSessions.create({
      account: accountId,
      components: {
        account_onboarding: {
          enabled: true,
          features: {
            external_account_collection: true,
          },
        },
        payouts: {
          enabled: true,
          features: {
            instant_payouts: true,
            standard_payouts: true,
            edit_payout_schedule: true,
            external_account_collection: true,
          },
        },
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
            destination_on_behalf_of_charge_management: false,
          },
        },
      },
    })

    return NextResponse.json({ clientSecret: accountSession.client_secret }, { status: 200 })
  } catch (error) {
    console.error("Error creating Stripe account session:", error)
    return NextResponse.json({ error: "Failed to create Stripe account session" }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"

