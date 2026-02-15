import { Checkout } from '@dodopayments/nextjs'

export const GET = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT, // 'test_mode' or 'live_mode'
    type: "static", // redirect user to Dodo's hosted checkout
});
