import { NextResponse } from "next/server";
import { fetchAuditData, fetchCompetitors } from "@/libs/data-provider";
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

        // Use data-provider to fetch from Serper + Outscraper + PageSpeed
        const { data: rawData, source: dataSource } = await fetchAuditData(
            businessName,
            city,
            placeId
        );

        // Fetch competitors if we have category + location
        if (rawData.primaryCategory && (city || rawData.businessAddress)) {
            const competitorCity = city || extractCity(rawData.businessAddress);
            if (competitorCity) {
                const competitors = await fetchCompetitors(
                    rawData.primaryCategory,
                    competitorCity,
                    rawData.businessName
                );
                rawData.competitors = competitors;
            }
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
        delete audit._outscraper;

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

