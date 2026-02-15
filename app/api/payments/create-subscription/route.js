/**
 * Create Subscription Route.
 *
 * POST /api/payments/create-subscription
 * Body: { planName: "pro" | "agency" }
 *
 * Uses Clerk auth for user identification.
 * Returns a Dodo payment link URL for checkout redirect.
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSubscription, getPlanByName } from "@/libs/dodo";

export async function POST(req) {
    try {
        const { planName } = await req.json();

        if (!planName) {
            return NextResponse.json(
                { error: "Plan name is required" },
                { status: 400 }
            );
        }

        const plan = getPlanByName(planName);
        if (!plan) {
            return NextResponse.json(
                { error: "Invalid plan name" },
                { status: 400 }
            );
        }

        // Get user from Clerk auth
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Please log in to subscribe" },
                { status: 401 }
            );
        }

        // For Dodo, we need an email. Clerk stores it separately.
        // Pass userId as email placeholder — webhook will handle matching.
        const result = await createSubscription(userId, plan.productId, userId);

        return NextResponse.json({
            paymentLink: result.paymentLink,
            subscriptionId: result.subscriptionId,
        });
    } catch (error) {
        console.error("Subscription creation error:", error);
        return NextResponse.json(
            { error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}
