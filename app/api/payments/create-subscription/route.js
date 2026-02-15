/**
 * Create Subscription Route.
 *
 * POST /api/payments/create-subscription
 * Body: { planName: "pro" | "agency" }
 *
 * Uses NextAuth session for user identification.
 * Returns a Dodo payment link URL for checkout redirect.
 */

import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
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

        // Get user from NextAuth session
        const session = await auth();
        const userId = session?.user?.id || "anonymous";
        const email = session?.user?.email || "";

        if (!email) {
            return NextResponse.json(
                { error: "Please log in to subscribe" },
                { status: 401 }
            );
        }

        const result = await createSubscription(userId, plan.productId, email);

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
