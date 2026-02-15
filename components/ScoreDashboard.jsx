"use client";

import { useEffect, useState } from "react";

const SCORE_COLORS = {
    A: "#10b981",
    B: "#3b82f6",
    C: "#f59e0b",
    D: "#f97316",
    F: "#ef4444",
};

const GRADE_LABELS = {
    A: "Excellent",
    B: "Good",
    C: "Average",
    D: "Below Avg",
    F: "Critical",
};

export default function ScoreDashboard({ totalScore, grade, sectionScores }) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const color = SCORE_COLORS[grade] || "#f59e0b";
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (animatedScore / 100) * circumference;

    useEffect(() => {
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedScore(Math.round(eased * totalScore));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [totalScore]);

    const sections = [
        { id: "profile", name: "Profile", max: 32, icon: "📋" },
        { id: "reviews", name: "Reviews", max: 25, icon: "⭐" },
        { id: "visual", name: "Visual", max: 13, icon: "📸" },
        { id: "activity", name: "Activity", max: 10, icon: "📢" },
        { id: "website", name: "Website", max: 12, icon: "🌐" },
        { id: "competitive", name: "Competitive", max: 8, icon: "🏆" },
    ];

    return (
        <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative flex-shrink-0">
                    <svg width="200" height="200" viewBox="0 0 100 100" className="score-ring">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-ring-bg"
                            strokeWidth="8"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="score-ring-fill"
                            strokeWidth="8"
                            stroke={color}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold" style={{ color }}>
                            {animatedScore}
                        </span>
                        <span className="text-sm text-base-content/60">/100</span>
                    </div>
                </div>

                {/* Grade + Info */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                        <span
                            className="text-4xl font-black px-4 py-1 rounded-xl"
                            style={{
                                backgroundColor: `${color}20`,
                                color,
                                border: `2px solid ${color}40`,
                            }}
                        >
                            {grade}
                        </span>
                        <span className="text-lg text-base-content/70 font-medium">
                            {GRADE_LABELS[grade]}
                        </span>
                    </div>
                    <p className="text-base-content/50 text-sm mt-1">
                        Based on Whitespark 2026 Local Search Ranking Factors & Search Atlas ML Study
                    </p>
                </div>
            </div>

            {/* Section Breakdown */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section) => {
                    const score = sectionScores?.[section.id] ?? 0;
                    const pct = Math.round((score / section.max) * 100);
                    const barColor =
                        pct >= 75 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444";

                    return (
                        <div
                            key={section.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-base-content/5"
                        >
                            <span className="text-xl">{section.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-base-content/80 font-medium">
                                        {section.name}
                                    </span>
                                    <span className="text-base-content/60">
                                        {score}/{section.max}
                                    </span>
                                </div>
                                <div className="w-full bg-base-content/10 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${pct}%`,
                                            backgroundColor: barColor,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
