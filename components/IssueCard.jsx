"use client";

import { useState } from "react";

const SEVERITY_STYLES = {
    critical: { bg: "severity-critical", label: "Critical", icon: "🔴" },
    high: { bg: "severity-high", label: "High", icon: "🟠" },
    medium: { bg: "severity-medium", label: "Medium", icon: "🟡" },
    low: { bg: "severity-low", label: "Low", icon: "🔵" },
};

export default function IssueCard({ issue, defaultExpanded = false }) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const style = SEVERITY_STYLES[issue.severity] || SEVERITY_STYLES.medium;

    return (
        <div className="glass-card overflow-hidden transition-all duration-300">
            {/* Header - always visible */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full p-4 sm:p-5 flex items-start gap-3 text-left hover:bg-base-content/5 transition-colors"
            >
                <span className="text-lg flex-shrink-0 mt-0.5">{style.icon}</span>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${style.bg}`}>
                            {style.label}
                        </span>
                        <span className="text-xs text-base-content/40 uppercase tracking-wide">
                            {issue.section}
                        </span>
                    </div>
                    <h3 className="font-semibold text-base-content text-sm sm:text-base">
                        {issue.name}
                    </h3>
                    <p className="text-sm text-base-content/60 mt-1 line-clamp-2">
                        {issue.description}
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex flex-col items-end text-xs text-base-content/50">
                        <span>⏱ {issue.timeToFix}</span>
                        <span className="mt-0.5">📈 {issue.expectedImpact}</span>
                    </div>
                    <svg
                        className={`w-5 h-5 text-base-content/40 transition-transform duration-300 ${expanded ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </button>

            {/* Expanded content */}
            {expanded && (
                <div className="px-5 pb-5 border-t border-base-content/10 animate-fade-in-up">
                    {/* Why it matters */}
                    <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
                        <p className="text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wide">
                            Why This Matters
                        </p>
                        <p className="text-sm text-base-content/70">{issue.whyItMatters}</p>
                    </div>

                    {/* How to fix */}
                    <div className="mt-4">
                        <p className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">
                            How to Fix
                        </p>
                        <ol className="space-y-2">
                            {issue.howToFix?.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-base-content/70">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Meta info */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-base-content/50">
                        <span className="flex items-center gap-1">
                            ⏱ <strong>Time to fix:</strong> {issue.timeToFix}
                        </span>
                        <span className="flex items-center gap-1">
                            📈 <strong>Impact:</strong> {issue.expectedImpact}
                        </span>
                        <span className="flex items-center gap-1">
                            ⚡ <strong>Results in:</strong> {issue.timeToResults}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
