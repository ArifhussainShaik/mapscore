import { NextResponse } from "next/server";
import { searchBusiness, isSerperConfigured } from "@/libs/serper";
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

        // Use Serper for real data, fall back to mock
        if (isSerperConfigured()) {
            try {
                const results = await searchBusiness(businessName, city);

                if (results.length > 0) {
                    return NextResponse.json({
                        results,
                        query: { businessName, city },
                        source: "serper",
                    });
                }
            } catch (error) {
                console.error("Serper search error, falling back to mock:", error.message);
            }
        }

        // Fallback: mock data
        const results = getMockSearchResults();

        const filtered = results.filter(
            (r) =>
                r.name.toLowerCase().includes(businessName.toLowerCase()) ||
                businessName.toLowerCase().includes(r.name.split(" ")[0].toLowerCase())
        );

        return NextResponse.json({
            results: filtered.length > 0 ? filtered : results,
            query: { businessName, city },
            source: "mock",
        });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Failed to search for business" },
            { status: 500 }
        );
    }
}
