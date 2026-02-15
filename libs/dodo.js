/**
 * Dodo Payments helper functions.
 * Replace with real Dodo SDK calls when ready for production.
 */

import config from "@/config";

/**
 * Create a Dodo subscription for a user.
 * @param {string} userId - The user's MongoDB ID
 * @param {string} productId - The Dodo product ID
 * @returns {{ paymentLink: string, subscriptionId: string }}
 */
export async function createSubscription(userId, productId) {
    // TODO: Replace with real Dodo API call
    // const dodo = require('dodopayments');
    // const subscription = await dodo.subscriptions.create({ ... });

    // Mock response for development
    return {
        paymentLink: `https://test.dodopayments.com/checkout/${productId}?ref=${userId}`,
        subscriptionId: `sub_mock_${Date.now()}`,
    };
}

/**
 * Get the Dodo customer portal URL.
 * @param {string} customerId - The Dodo customer ID
 * @returns {string} Portal URL
 */
export async function getCustomerPortalUrl(customerId) {
    // TODO: Replace with real Dodo API call
    return `https://test.dodopayments.com/portal/${customerId}`;
}

/**
 * Verify a Dodo webhook signature.
 * @param {string} payload - Raw request body
 * @param {string} signature - Webhook signature header
 * @returns {boolean}
 */
export function verifyWebhookSignature(payload, signature) {
    // TODO: Use standardwebhooks to verify
    // const wh = new Webhook(process.env.DODO_WEBHOOK_SECRET);
    // return wh.verify(payload, signature);
    return true; // Mock: always valid in dev
}

/**
 * Get plan details from config by product ID.
 */
export function getPlanByProductId(productId) {
    return config.dodo.plans.find((p) => p.productId === productId);
}

/**
 * Get plan details by name.
 */
export function getPlanByName(name) {
    return config.dodo.plans.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
    );
}
