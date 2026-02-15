/**
 * Static Checkout Route using @dodopayments/nextjs adapter.
 *
 * Usage: GET /api/checkout?product_id=prd_XXXXX
 * Redirects user to Dodo's hosted checkout page.
 */

import { Checkout } from "@dodopayments/nextjs";

export const GET = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    returnUrl: process.env.DODO_PAYMENTS_RETURN_URL || "http://localhost:3000/checkout/success",
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT || "test_mode",
    type: "static",
});
