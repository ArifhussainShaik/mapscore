import { NextResponse } from "next/server";
import { getMockAuditData } from "@/libs/mockData";
import { calculateScore } from "@/libs/scoring";
import { detectIssues, generateActionPlan } from "@/libs/issues";

export async function POST(req) {
    try {
        const { placeId, businessName } = await req.json();

        if (!placeId && !businessName) {
            return NextResponse.json(
                { error: "placeId or businessName is required" },
                { status: 400 }
            );
        }

        // TODO: Replace with real Outscraper / SerpAPI data extraction
        // For MVP, use mock data and run the real scoring engine
        const rawData = getMockAuditData();

        // Run scoring engine
        const { totalScore, grade, sectionScores, checkResults } =
            calculateScore(rawData);

        // Detect issues
        const issues = detectIssues(rawData);

        // Generate action plan
        const actionPlan = generateActionPlan(issues);

        // Build audit result
        const audit = {
            id: `audit_${Date.now()}`,
            ...rawData,
            totalScore,
            grade,
            sectionScores,
            checkResults,
            issues,
            actionPlan,
            createdAt: new Date().toISOString(),
            cachedUntil: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
        };

        // TODO: Save to MongoDB
        // const savedAudit = await Audit.create({ ...audit, userId: session.user.id });

        return NextResponse.json({ audit });
    } catch (error) {
        console.error("Audit run error:", error);
        return NextResponse.json(
            { error: "Failed to run audit" },
            { status: 500 }
        );
    }
}
