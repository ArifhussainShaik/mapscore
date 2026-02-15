/**
 * Customer Portal Route using @dodopayments/nextjs adapter.
 *
 * Usage: GET /api/customer-portal?customer_id=cus_XXXXX
 * Redirects user to Dodo's hosted customer portal where they can
 * manage subscriptions, update payment methods, and view invoices.
 */

import { CustomerPortal } from "@dodopayments/nextjs";

export const GET = CustomerPortal({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT || "test_mode",
});
