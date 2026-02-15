"use client";

import Link from "next/link";

export default function PaywallGate({ children, title = "Unlock Full Report" }) {
    return (
        <div className="relative">
            {/* Blurred content */}
            <div className="paywall-blur">{children}</div>

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-base-100/60 backdrop-blur-sm rounded-2xl">
                <div className="text-center p-8 max-w-md">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-bold text-base-content mb-2">
                        {title}
                    </h3>
                    <p className="text-sm text-base-content/60 mb-6">
                        Upgrade to Pro to access the full detailed audit report, PDF export,
                        competitor comparison, and priority action plan.
                    </p>
                    <Link href="/#pricing" className="btn btn-brand btn-md px-8">
                        Upgrade to Pro — $29/mo
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                    <p className="text-xs text-base-content/40 mt-3">
                        Cancel anytime. No long-term commitment.
                    </p>
                </div>
            </div>
        </div>
    );
}
