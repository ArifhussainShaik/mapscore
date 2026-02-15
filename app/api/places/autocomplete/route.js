import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.trim().length < 3) {
        return NextResponse.json({ predictions: [] });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    // If no API key, return mock suggestions for development
    if (!apiKey) {
        const mockPredictions = getMockPredictions(query);
        return NextResponse.json({ predictions: mockPredictions });
    }

    try {
        // Google Places Autocomplete API (New)
        const response = await fetch(
            "https://places.googleapis.com/v1/places:autocomplete",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                },
                body: JSON.stringify({
                    input: query,
                    includedPrimaryTypes: ["establishment"],
                    languageCode: "en",
                }),
            }
        );

        if (!response.ok) {
            console.error("Google Places API error:", response.status);
            // Fallback to mock data on API error
            return NextResponse.json({ predictions: getMockPredictions(query) });
        }

        const data = await response.json();

        const predictions = (data.suggestions || [])
            .filter((s) => s.placePrediction)
            .slice(0, 5)
            .map((s) => ({
                placeId: s.placePrediction.placeId,
                name: s.placePrediction.structuredFormat?.mainText?.text || "",
                address:
                    s.placePrediction.structuredFormat?.secondaryText?.text || "",
                description: s.placePrediction.text?.text || "",
            }));

        return NextResponse.json({ predictions });
    } catch (error) {
        console.error("Places autocomplete error:", error);
        return NextResponse.json({ predictions: getMockPredictions(query) });
    }
}

/**
 * Mock predictions for development without API key.
 * Returns realistic-looking results based on the query string.
 */
function getMockPredictions(query) {
    const mockBusinesses = [
        {
            placeId: "ChIJ_mock_1",
            name: "AK Copier Solutions",
            address: "Nandyal, Andhra Pradesh, India",
            description: "AK Copier Solutions, Nandyal, Andhra Pradesh, India",
        },
        {
            placeId: "ChIJ_mock_2",
            name: "Austin Premier Plumbing",
            address: "4521 Congress Ave, Austin, TX 78745",
            description: "Austin Premier Plumbing, Austin, TX",
        },
        {
            placeId: "ChIJ_mock_3",
            name: "Austin HVAC Experts",
            address: "2200 S Lamar Blvd, Austin, TX 78704",
            description: "Austin HVAC Experts, Austin, TX",
        },
        {
            placeId: "ChIJ_mock_4",
            name: "Ace Hardware Store",
            address: "123 Main St, Springfield, IL 62701",
            description: "Ace Hardware Store, Springfield, IL",
        },
        {
            placeId: "ChIJ_mock_5",
            name: "Alpine Dental Clinic",
            address: "45 Mountain View Rd, Denver, CO 80202",
            description: "Alpine Dental Clinic, Denver, CO",
        },
        {
            placeId: "ChIJ_mock_6",
            name: "Aqua Pool Services",
            address: "789 Sunset Blvd, Miami, FL 33101",
            description: "Aqua Pool Services, Miami, FL",
        },
        {
            placeId: "ChIJ_mock_7",
            name: "AK Electronics & Repairs",
            address: "12 Tech Park, Hyderabad, Telangana, India",
            description: "AK Electronics & Repairs, Hyderabad, India",
        },
        {
            placeId: "ChIJ_mock_8",
            name: "Apex Auto Service",
            address: "500 Commerce Dr, Chicago, IL 60601",
            description: "Apex Auto Service, Chicago, IL",
        },
    ];

    const q = query.toLowerCase();
    return mockBusinesses
        .filter(
            (b) =>
                b.name.toLowerCase().includes(q) ||
                b.address.toLowerCase().includes(q)
        )
        .slice(0, 5);
}
