"use client";

import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

const GRADE_COLORS = {
  A: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
  B: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  C: "text-amber-400 bg-amber-500/20 border-amber-500/30",
  D: "text-orange-400 bg-orange-500/20 border-orange-500/30",
  F: "text-red-400 bg-red-500/20 border-red-500/30",
};

const SCORE_COLORS = {
  A: "#10b981",
  B: "#3b82f6",
  C: "#f59e0b",
  D: "#f97316",
  F: "#ef4444",
};

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [audits, setAudits] = useState([]);
  const [isLoadingAudits, setIsLoadingAudits] = useState(true);

  // Fetch user's audits from API
  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/audits")
        .then((res) => res.json())
        .then((data) => {
          setAudits(data.audits || []);
          setIsLoadingAudits(false);
        })
        .catch(() => {
          setIsLoadingAudits(false);
        });
    }
  }, [isSignedIn]);

  // Loading state
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[var(--color-brand-dark)] flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-emerald-400"></span>
          <p className="text-base-content/50 text-sm mt-4">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  // Not authenticated — show branded login prompt
  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[var(--color-brand-dark)] flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <span className="text-5xl mb-4 block">🔒</span>
          <h1 className="text-2xl font-bold text-white mb-2">
            Sign in to your dashboard
          </h1>
          <p className="text-base-content/50 text-sm mb-6">
            Access your saved audits, monitoring alerts, and detailed reports.
          </p>

          <SignInButton mode="modal">
            <button className="btn btn-lg w-full bg-white text-gray-800 hover:bg-gray-100 border-0 mb-3">
              🚀 Sign In / Sign Up
            </button>
          </SignInButton>

          <p className="text-xs text-base-content/40 mt-4">
            By signing in you agree to our terms of service.
          </p>

          <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 mt-6 inline-block">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  // Stats
  const avgScore = audits.length > 0
    ? Math.round(audits.reduce((s, a) => s + (a.totalScore || 0), 0) / audits.length)
    : 0;

  // Authenticated — show dashboard
  return (
    <main className="min-h-screen bg-[var(--color-brand-dark)] p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-base-content/50 text-sm mt-1">
              Welcome back, {user?.firstName || user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-brand btn-sm">
              + New Audit
            </Link>
            {/* Clerk UserButton — handles avatar, menu, sign out */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Audits", value: audits.length, icon: "📊" },
            { label: "Average Score", value: avgScore || "—", icon: "⚡" },
            { label: "Latest Grade", value: audits[0]?.grade || "—", icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-xs text-base-content/50 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            📋 Saved Audits
          </h2>

          {isLoadingAudits ? (
            <div className="glass-card p-8 text-center">
              <span className="loading loading-spinner loading-md text-emerald-400"></span>
              <p className="text-base-content/50 text-sm mt-3">Loading your audits...</p>
            </div>
          ) : audits.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <span className="text-4xl mb-3 block">🔍</span>
              <h3 className="text-lg font-semibold text-white mb-2">No audits yet</h3>
              <p className="text-base-content/50 text-sm mb-4">
                Run your first GBP audit to see results here.
              </p>
              <Link href="/" className="btn btn-brand btn-sm">
                Run Your First Audit →
              </Link>
            </div>
          ) : (
            audits.map((audit) => {
              const gradeClass = GRADE_COLORS[audit.grade] || GRADE_COLORS.C;
              const color = SCORE_COLORS[audit.grade] || "#f59e0b";

              return (
                <Link
                  key={audit.id || audit._id}
                  href={`/audit/${audit.id || audit._id}`}
                  className="glass-card p-5 flex items-center gap-4 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group block"
                >
                  {/* Score */}
                  <div className="flex-shrink-0 relative w-14 h-14">
                    <svg width="56" height="56" viewBox="0 0 56 56" className="score-ring">
                      <circle cx="28" cy="28" r="24" strokeWidth="4" className="score-ring-bg" />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        strokeWidth="4"
                        className="score-ring-fill"
                        stroke={color}
                        strokeDasharray={2 * Math.PI * 24}
                        strokeDashoffset={2 * Math.PI * 24 * (1 - (audit.totalScore || 0) / 100)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color }}>{audit.totalScore}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {audit.businessName}
                    </h3>
                    <p className="text-xs text-base-content/50 mt-0.5 truncate">
                      {audit.businessAddress}
                    </p>
                  </div>

                  {/* Grade badge */}
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${gradeClass}`}>
                    {audit.grade}
                  </span>

                  {/* Meta */}
                  <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-base-content/40">
                    <span>{new Date(audit.createdAt).toLocaleDateString()}</span>
                    <span className="text-base-content/30">{audit.dataSource}</span>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-base-content/20 group-hover:text-emerald-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              );
            })
          )}
        </div>

        {/* Upgrade banner */}
        <div className="glass-card p-6 mt-8 text-center border-emerald-500/20">
          <h3 className="text-lg font-bold text-white mb-2">
            Need unlimited audits?
          </h3>
          <p className="text-sm text-base-content/50 mb-4">
            Upgrade to Pro for unlimited audits, full reports, and PDF export.
          </p>
          <Link href="/#pricing" className="btn btn-brand btn-sm">
            Upgrade to Pro — $29/mo
          </Link>
        </div>
      </div>
    </main>
  );
}
