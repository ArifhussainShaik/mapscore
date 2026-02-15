import { NextResponse } from "next/server";
import { createSubscription } from "@/libs/dodo";
import { getPlanByName } from "@/libs/dodo";

export async function POST(req) {
    try {
        const { planName, userId } = await req.json();

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

        // TODO: Get userId from NextAuth session
        // const session = await getServerSession(authOptions);
        // const userId = session?.user?.id;

        const result = await createSubscription(
            userId || "mock_user",
            plan.productId
        );

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
