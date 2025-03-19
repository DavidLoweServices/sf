// This file is using the App Router's Route Handlers
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

interface VenueSettingsResponse {
  succeeded: boolean;
  data?: {
    venueSettings: Array<{
      name: string;
      value: string;
    }>;
  };
}

export async function GET(request: Request) {
  try {
    // Get the venue ID from the query string
    const url = new URL(request.url);
    const venueId = url.searchParams.get('venueId');

    if (!venueId) {
      return NextResponse.json({ error: "Venue ID is required" }, { status: 400 });
    }

    // Fetch venue settings to get RyftSubAccountID
    const settingsUrl = `https://dev-api.wannabook.online/venuesettings/${venueId}`;

    const settingsResponse = await fetch(settingsUrl);

    if (!settingsResponse.ok) {
      return NextResponse.json({
        error: `Failed to fetch venue settings: ${settingsResponse.statusText}`
      }, { status: settingsResponse.status });
    }

    const venueSettings: VenueSettingsResponse = await settingsResponse.json();

    // Find RyftSubAccountID in venue settings
    let accountId = null;

    if (venueSettings.succeeded && venueSettings.data && Array.isArray(venueSettings.data.venueSettings)) {
      const ryftSetting = venueSettings.data.venueSettings.find(
        setting => setting.name === 'RyftSubAccountID'
      );

      if (ryftSetting && ryftSetting.value) {
        accountId = ryftSetting.value;
      }
    }

    console.log('1. accountId: ', accountId);

    // If RyftSubAccountID not found, use default
    if (!accountId) {

      //get StripeOnboardVenue
      const onboardVenueUrl = `https://dev-api.wannabook.online/stripeonboardvenue/${venueId}`;
      const onboardVenueResponse = await fetch(onboardVenueUrl);
      const onboardVenue = await onboardVenueResponse.json();

      //onboardVenue.data
      if (onboardVenue.succeeded) {
        accountId = onboardVenue.data;
      }
      console.log('onboardVenue: ', onboardVenue);
      console.log('2. accountId: ', accountId);

      console.warn('created new account with id: ', accountId);
    }

    // Check if account has payouts and payments enabled
    if (accountId) {
      try {
        const account = await stripe.accounts.retrieve(accountId);
        console.log('Stripe account capabilities:', {
          payoutsEnabled: account.capabilities?.transfers === 'active',
          paymentsEnabled: account.capabilities?.card_payments === 'active',
          accountId: accountId
        });
      } catch (error) {
        console.error('Error checking Stripe account capabilities:', error);
      }
    }

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
        notification_banner: {
          enabled: true,
          features: {
            external_account_collection: true,
          },
        },
      },
    });



    return NextResponse.json({ clientSecret: accountSession.client_secret }, { status: 200 });
  } catch (error) {
    console.error("Error creating Stripe account session:", error);
    return NextResponse.json({ error: "Failed to create Stripe account session" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic"

