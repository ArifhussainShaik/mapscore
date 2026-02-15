"use client";

import { useState } from "react";

const IMPACT_COLORS = {
    "Very High": "text-red-400 bg-red-400/10",
    High: "text-orange-400 bg-orange-400/10",
    "Medium-High": "text-amber-400 bg-amber-400/10",
    Medium: "text-yellow-400 bg-yellow-400/10",
    "Low-Medium": "text-blue-400 bg-blue-400/10",
    Low: "text-blue-300 bg-blue-300/10",
};

const tabs = [
    { id: "doToday", label: "Do Today", emoji: "🔥", description: "Critical fixes to handle immediately" },
    { id: "thisMonth", label: "This Month", emoji: "📅", description: "Important improvements for this month" },
    { id: "ongoing", label: "Ongoing", emoji: "🔄", description: "Recurring tasks for sustained growth" },
];

export default function ActionPlan({ actionPlan }) {
    const [activeTab, setActiveTab] = useState("doToday");

    if (!actionPlan) return null;

    const currentItems = actionPlan[activeTab] || [];

    return (
        <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-base-content/10">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    🎯 Priority Action Plan
                </h3>
                <p className="text-sm text-base-content/50 mt-1">
                    Follow this plan to maximize your GBP score
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-base-content/10">
                {tabs.map((tab) => {
                    const count = actionPlan[tab.id]?.length || 0;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${isActive
                                    ? "text-emerald-400"
                                    : "text-base-content/50 hover:text-base-content/70"
                                }`}
                        >
                            <span className="flex items-center justify-center gap-1.5">
                                {tab.emoji} {tab.label}
                                {count > 0 && (
                                    <span
                                        className={`text-xs px-1.5 py-0.5 rounded-full ${isActive
                                                ? "bg-emerald-500/20 text-emerald-400"
                                                : "bg-base-content/10 text-base-content/40"
                                            }`}
                                    >
                                        {count}
                                    </span>
                                )}
                            </span>
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab description */}
            <div className="px-5 pt-4">
                <p className="text-xs text-base-content/40">
                    {tabs.find((t) => t.id === activeTab)?.description}
                </p>
            </div>

            {/* Action items */}
            <div className="p-5 space-y-3">
                {currentItems.length === 0 ? (
                    <p className="text-base-content/40 text-sm text-center py-4">
                        No actions in this category 🎉
                    </p>
                ) : (
                    currentItems.map((item, i) => {
                        const impactCls =
                            IMPACT_COLORS[item.impact] || "text-base-content/60 bg-base-content/10";
                        return (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-3 rounded-lg bg-base-content/5 hover:bg-base-content/8 transition-colors"
                            >
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-base-content/90">
                                        {item.action}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="text-xs text-base-content/50 flex items-center gap-1">
                                            ⏱ {item.timeEstimate}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-md font-medium ${impactCls}`}
                                        >
                                            {item.impact} impact
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
