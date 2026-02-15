import { NextResponse } from "next/server";
import { getBusinessDetails, getCompetitors, isSerperConfigured } from "@/libs/serper";
import { getMockAuditData } from "@/libs/mockData";
import { calculateScore } from "@/libs/scoring";
import { detectIssues, generateActionPlan } from "@/libs/issues";

export async function POST(req) {
    try {
        const { placeId, businessName, city } = await req.json();

        if (!placeId && !businessName) {
            return NextResponse.json(
                { error: "placeId or businessName is required" },
                { status: 400 }
            );
        }

        let rawData;
        let dataSource = "mock";

        // Try Serper for real data
        if (isSerperConfigured()) {
            try {
                console.log(`[Audit] Fetching real data for "${businessName}" via Serper...`);

                // 1. Get business details
                rawData = await getBusinessDetails(businessName, city, placeId);

                // 2. Get competitors based on category + city
                if (rawData.primaryCategory && (city || rawData.businessAddress)) {
                    const competitorCity = city || extractCity(rawData.businessAddress);
                    if (competitorCity) {
                        const competitors = await getCompetitors(
                            rawData.primaryCategory,
                            competitorCity,
                            rawData.businessName
                        );
                        rawData.competitors = competitors;
                    }
                }

                dataSource = "serper";
                console.log(`[Audit] Got real data: ${rawData.businessName} (${rawData.reviewCount} reviews, ${rawData.averageRating}★)`);
            } catch (error) {
                console.error("[Audit] Serper fetch failed, falling back to mock:", error.message);
                rawData = null;
            }
        }

        // Fallback to mock data
        if (!rawData) {
            rawData = getMockAuditData();
            // Override business name if provided
            if (businessName) rawData.businessName = businessName;
            if (city) rawData.businessAddress = `${city}`;
        }

        // Run scoring engine (works with both real and mock data)
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
            dataSource,
            createdAt: new Date().toISOString(),
            cachedUntil: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
        };

        // Remove internal metadata from response
        delete audit._source;
        delete audit._serperCid;

        return NextResponse.json({ audit });
    } catch (error) {
        console.error("Audit run error:", error);
        return NextResponse.json(
            { error: "Failed to run audit" },
            { status: 500 }
        );
    }
}

/**
 * Extract city from a full address string.
 * E.g., "4521 Congress Ave, Austin, TX 78745" → "Austin"
 */
function extractCity(address) {
    if (!address) return "";
    const parts = address.split(",").map((p) => p.trim());
    // Usually city is the second part
    if (parts.length >= 2) {
        return parts[1].replace(/\d+/g, "").trim(); // Remove zip codes
    }
    return parts[0];
}
