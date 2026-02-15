// app/api/webhooks/dodo/route.ts
import { Webhooks } from "@dodopayments/nextjs";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export const POST = Webhooks({
    webhookKey: process.env.DODO_WEBHOOK_SECRET,

    onPayload: async (payload) => {
        console.log("Dodo Webhook received:", payload.type);
    },

    // Event: Subscription Created
    onSubscriptionCreated: async (data) => {
        try {
            await connectMongo();
            const { customer, subscription_id, product_id, metadata } = data;

            // Use user_id from metadata if available, otherwise look up by email
            const userId = metadata?.user_id;
            const email = customer.email;

            // Determine plan based on product_id (helper logic could go here)
            // For now, simpler logic:
            // You might map product_id to 'pro' | 'agency' etc.

            console.log(`[Dodo] Subscription created for ${email} (User: ${userId})`);

            // Example DB update (adjust based on your User model)
            if (userId) {
                await User.findByIdAndUpdate(userId, {
                    priceId: product_id,
                    hasAccess: true,
                    customerId: customer.customer_id,
                });
            } else if (email) {
                await User.findOneAndUpdate({ email: email }, {
                    priceId: product_id,
                    hasAccess: true,
                    customerId: customer.customer_id,
                });
            }
        } catch (e) {
            console.error("[Dodo] Error handling subscription_created:", e);
        }
    },

    // Event: Subscription Cancelled
    onSubscriptionCancelled: async (data) => {
        try {
            await connectMongo();
            const { customer } = data;
            const email = customer.email;

            console.log(`[Dodo] Subscription cancelled for ${email}`);

            // Revoke access or set status to cancelled at end of period
            await User.findOneAndUpdate({ email: email }, {
                hasAccess: false,
            });

        } catch (e) {
            console.error("[Dodo] Error handling subscription_cancelled:", e);
        }
    },

    // Event: Payment Succeeded
    onPaymentSucceeded: async (data) => {
        console.log(`[Dodo] Payment succeeded for ${data.customer.email}`);
        // Optional: Send welcome email via Resend here
    },

    // Event: Payment Failed
    onPaymentFailed: async (data) => {
        console.error(`[Dodo] Payment failed for ${data.customer.email}`);
        // Optional: Send alert email
    },
});
