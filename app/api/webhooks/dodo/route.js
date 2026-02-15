import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/libs/dodo";

export async function POST(req) {
    try {
        const body = await req.text();
        const signature = req.headers.get("webhook-signature") || "";

        // Verify webhook signature
        const isValid = verifyWebhookSignature(body, signature);
        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid webhook signature" },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);
        const eventType = event.type || event.event_type;

        console.log(`[Dodo Webhook] Received event: ${eventType}`);

        switch (eventType) {
            case "payment.succeeded": {
                // TODO: Update user plan in MongoDB
                // const user = await User.findOne({ dodoCustomerId: event.data.customer_id });
                // user.plan = "pro";
                // user.hasAccess = true;
                // user.subscriptionStatus = "active";
                // await user.save();
                console.log("[Dodo Webhook] Payment succeeded:", event.data);
                break;
            }

            case "subscription.created": {
                // TODO: Activate user subscription
                console.log("[Dodo Webhook] Subscription created:", event.data);
                break;
            }

            case "subscription.cancelled": {
                // TODO: Downgrade user to free tier
                console.log("[Dodo Webhook] Subscription cancelled:", event.data);
                break;
            }

            case "subscription.payment_failed": {
                // TODO: Send dunning email, set status to past_due
                console.log("[Dodo Webhook] Payment failed:", event.data);
                break;
            }

            case "refund.succeeded": {
                // TODO: Downgrade plan, log refund
                console.log("[Dodo Webhook] Refund succeeded:", event.data);
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
