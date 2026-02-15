"use client";

import { useEffect, useState } from "react";

const SCAN_STEPS = [
    { label: "Finding your business on Google Maps", icon: "🗺️", duration: 2000 },
    { label: "Checking profile completeness", icon: "📋", duration: 1500 },
    { label: "Analyzing reviews & ratings", icon: "⭐", duration: 2000 },
    { label: "Evaluating photos & visuals", icon: "📸", duration: 1200 },
    { label: "Scanning competitors in your area", icon: "🏆", duration: 2500 },
    { label: "Checking website signals", icon: "🌐", duration: 1500 },
    { label: "Generating your audit report", icon: "📊", duration: 1800 },
];

export default function ScanningProgress({ businessName, city, onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let totalElapsed = 0;
        const totalDuration = SCAN_STEPS.reduce((sum, s) => sum + s.duration, 0);

        const timer = setInterval(() => {
            totalElapsed += 100;
            const newProgress = Math.min(
                Math.round((totalElapsed / totalDuration) * 100),
                100
            );
            setProgress(newProgress);

            // Determine current step
            let elapsed = 0;
            for (let i = 0; i < SCAN_STEPS.length; i++) {
                elapsed += SCAN_STEPS[i].duration;
                if (totalElapsed < elapsed) {
                    setCurrentStep(i);
                    break;
                }
                if (i === SCAN_STEPS.length - 1) {
                    setCurrentStep(SCAN_STEPS.length);
                }
            }

            if (totalElapsed >= totalDuration) {
                clearInterval(timer);
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--color-brand-dark)]">
            <div className="glass-card p-8 md:p-12 max-w-lg w-full text-center">
                {/* Animated scanner icon */}
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-emerald-500/20 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        🔍
                    </div>
                </div>

                <h2 className="text-xl font-bold text-base-content mb-2">
                    Analyzing {businessName || "your business"}
                </h2>
                {city && (
                    <p className="text-base-content/50 text-sm mb-6">in {city}</p>
                )}

                {/* Progress bar */}
                <div className="w-full bg-base-content/10 rounded-full h-2 mb-6 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Current step */}
                <div className="space-y-3">
                    {SCAN_STEPS.map((step, i) => {
                        const isActive = i === currentStep;
                        const isDone = i < currentStep;

                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 py-1.5 px-3 rounded-lg transition-all duration-300 ${isActive
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : isDone
                                        ? "text-base-content/40"
                                        : "text-base-content/20"
                                    }`}
                            >
                                <span className="w-5 h-5 flex items-center justify-center text-sm flex-shrink-0">
                                    {isDone ? (
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    ) : isActive ? (
                                        <span className="loading loading-spinner loading-xs text-emerald-400"></span>
                                    ) : (
                                        <span className="text-xs">{step.icon}</span>
                                    )}
                                </span>
                                <span className="text-sm">{step.label}</span>
                            </div>
                        );
                    })}
                </div>

                <p className="text-xs text-base-content/30 mt-6">
                    Estimated time: ~20 seconds
                </p>
            </div>
        </div>
    );
}
