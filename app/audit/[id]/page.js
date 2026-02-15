"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuditReport from "@/components/AuditReport";
import ScanningProgress from "@/components/ScanningProgress";
import { getMockScoredAudit } from "@/libs/mockData";

export default function AuditPage() {
    const searchParams = useSearchParams();
    const businessName = searchParams.get("business") || "Austin Premier Plumbing";
    const city = searchParams.get("city") || "Austin, TX";

    const [scanning, setScanning] = useState(true);
    const [auditData, setAuditData] = useState(null);

    const handleScanComplete = useCallback(() => {
        const data = getMockScoredAudit();
        // Override with URL params if provided
        if (searchParams.get("business")) {
            data.businessName = businessName;
        }
        setAuditData(data);
        setScanning(false);
    }, [businessName, searchParams]);

    if (scanning) {
        return (
            <ScanningProgress
                businessName={businessName}
                city={city}
                onComplete={handleScanComplete}
            />
        );
    }

    return (
        <main className="min-h-screen bg-[var(--color-brand-dark)] py-8 px-4">
            {/* Top bar */}
            <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span className="text-sm font-medium">New Audit</span>
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-base-content/40">
                        Scanned {new Date(auditData?.createdAt).toLocaleDateString()}
                    </span>
                    <Link href="/audit/demo/pdf" className="btn btn-sm btn-outline border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                        📥 Download PDF
                    </Link>
                </div>
            </div>

            <AuditReport audit={auditData} isPro={false} />
        </main>
    );
}
