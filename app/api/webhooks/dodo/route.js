/**
 * Dodo Payments Webhook Handler.
 *
 * Receives webhook events from Dodo Payments and updates user records
 * in MongoDB (subscription status, plan, access level).
 *
 * Events handled:
 *   - subscription.active   → Activate user subscription
 *   - subscription.cancelled → Downgrade user
 *   - payment.succeeded      → Log payment success
 *   - payment.failed         → Mark subscription as past_due
 *   - refund.succeeded       → Downgrade and log refund
 */

import { NextResponse } from "next/server";
import { verifyWebhookSignature, getPlanByProductId } from "@/libs/dodo";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
    try {
        const rawBody = await req.text();

        // Verify webhook signature
        let event;
        try {
            event = verifyWebhookSignature(rawBody, req.headers);
        } catch (error) {
            console.error("[Dodo Webhook] Signature verification failed:", error.message);
            return NextResponse.json(
                { error: "Invalid webhook signature" },
                { status: 401 }
            );
        }

        const eventType = event.type || event.event_type;
        const data = event.data || event;

        console.log(`[Dodo Webhook] Received event: ${eventType}`);
        console.log(`[Dodo Webhook] Data:`, JSON.stringify(data).slice(0, 500));

        // Connect to MongoDB
        await connectMongo();

        switch (eventType) {
            // ── Subscription activated ──
            case "subscription.active":
            case "subscription.created": {
                const customerId = data.customer?.customer_id || data.customer_id;
                const customerEmail = data.customer?.email || data.email;
                const subscriptionId = data.subscription_id || data.id;
                const productId = data.product_id;

                // Determine plan from product ID
                const plan = getPlanByProductId(productId);
                const planName = plan?.name?.toLowerCase() || "pro";

                // Find user by email or dodoCustomerId
                let user = null;
                if (customerEmail) {
                    user = await User.findOne({ email: customerEmail });
                }
                if (!user && customerId) {
                    user = await User.findOne({ dodoCustomerId: customerId });
                }
                // Try metadata user_id
                if (!user && data.metadata?.user_id) {
                    user = await User.findById(data.metadata.user_id);
                }

                if (user) {
                    user.dodoCustomerId = customerId;
                    user.dodoSubscriptionId = subscriptionId;
                    user.plan = planName;
                    user.subscriptionStatus = "active";
                    user.hasAccess = true;
                    await user.save();
                    console.log(`[Dodo Webhook] User ${user.email} upgraded to ${planName}`);
                } else {
                    console.warn(`[Dodo Webhook] No user found for customer: ${customerEmail || customerId}`);
                }
                break;
            }

            // ── Subscription cancelled ──
            case "subscription.cancelled":
            case "subscription.canceled": {
                const customerId = data.customer?.customer_id || data.customer_id;
                const subscriptionId = data.subscription_id || data.id;

                const user = await User.findOne({
                    $or: [
                        { dodoSubscriptionId: subscriptionId },
                        { dodoCustomerId: customerId },
                    ],
                });

                if (user) {
                    user.plan = "free";
                    user.subscriptionStatus = "cancelled";
                    user.hasAccess = false;
                    await user.save();
                    console.log(`[Dodo Webhook] User ${user.email} downgraded to free`);
                }
                break;
            }

            // ── Payment succeeded ──
            case "payment.succeeded": {
                const customerEmail = data.customer?.email || data.email;
                console.log(`[Dodo Webhook] Payment succeeded for ${customerEmail}`);
                // Good place to trigger welcome email or record payment
                break;
            }

            // ── Payment failed ──
            case "payment.failed": {
                const customerId = data.customer?.customer_id || data.customer_id;
                const subscriptionId = data.subscription_id;

                const user = await User.findOne({
                    $or: [
                        { dodoSubscriptionId: subscriptionId },
                        { dodoCustomerId: customerId },
                    ],
                });

                if (user) {
                    user.subscriptionStatus = "past_due";
                    await user.save();
                    console.log(`[Dodo Webhook] Payment failed for ${user.email} — marked past_due`);
                    // TODO: Send dunning email via Resend
                }
                break;
            }

            // ── Refund ──
            case "refund.succeeded": {
                const customerId = data.customer?.customer_id || data.customer_id;

                const user = await User.findOne({ dodoCustomerId: customerId });
                if (user) {
                    user.plan = "free";
                    user.subscriptionStatus = "cancelled";
                    user.hasAccess = false;
                    await user.save();
                    console.log(`[Dodo Webhook] Refund processed for ${user.email}`);
                }
                break;
            }

            default:
                console.log(`[Dodo Webhook] Unhandled event type: ${eventType}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("[Dodo Webhook] Error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
