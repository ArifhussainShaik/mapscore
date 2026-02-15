import { NextResponse } from "next/server";
import { getMockScoredAudit } from "@/libs/mockData";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Audit ID is required" },
                { status: 400 }
            );
        }

        // TODO: Replace with MongoDB lookup
        // const audit = await Audit.findById(id);
        // For MVP, return mock data
        const audit = getMockScoredAudit();
        audit.id = id;

        return NextResponse.json({ audit });
    } catch (error) {
        console.error("Audit fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch audit" },
            { status: 500 }
        );
    }
}
