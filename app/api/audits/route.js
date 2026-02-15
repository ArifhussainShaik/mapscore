/**
 * User Audits API.
 *
 * GET /api/audits — Fetch all audits for the authenticated user.
 * Returns audits sorted by creation date (newest first).
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/libs/mongoose";
import Audit from "@/models/Audit";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        await connectMongo();

        const audits = await Audit.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50)
            .select({
                businessName: 1,
                businessAddress: 1,
                totalScore: 1,
                grade: 1,
                dataSource: 1,
                createdAt: 1,
            })
            .lean();

        return NextResponse.json({ audits });
    } catch (error) {
        console.error("Fetch audits error:", error);
        return NextResponse.json(
            { error: "Failed to fetch audits" },
            { status: 500 }
        );
    }
}
