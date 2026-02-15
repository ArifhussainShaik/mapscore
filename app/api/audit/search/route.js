import { NextResponse } from "next/server";
import { getMockSearchResults } from "@/libs/mockData";

export async function POST(req) {
    try {
        const { businessName, city } = await req.json();

        if (!businessName) {
            return NextResponse.json(
                { error: "Business name is required" },
                { status: 400 }
            );
        }

        // TODO: Replace with real SerpAPI / Google Maps search
        // For MVP, return mock results
        const results = getMockSearchResults();

        // Filter by name if provided (case-insensitive)
        const filtered = results.filter(
            (r) =>
                r.name.toLowerCase().includes(businessName.toLowerCase()) ||
                businessName.toLowerCase().includes(r.name.split(" ")[0].toLowerCase())
        );

        return NextResponse.json({
            results: filtered.length > 0 ? filtered : results,
            query: { businessName, city },
        });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Failed to search for business" },
            { status: 500 }
        );
    }
}
