"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { getMockSavedAudits } from "@/libs/mockData";

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
  const { data: session, status } = useSession();
  const audits = getMockSavedAudits();

  // Loading state
  if (status === "loading") {
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
  if (status === "unauthenticated") {
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

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="btn btn-lg w-full bg-white text-gray-800 hover:bg-gray-100 border-0 mb-3"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => signIn("email", { callbackUrl: "/dashboard" })}
            className="btn btn-lg w-full btn-outline border-base-content/20 text-base-content/70"
          >
            ✉️ Continue with Email
          </button>

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

  // Authenticated — show dashboard
  return (
    <main className="min-h-screen bg-[var(--color-brand-dark)] p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-base-content/50 text-sm mt-1">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-brand btn-sm">
              + New Audit
            </Link>
            {/* User menu */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-7 h-7 rounded-full"
                    referrerPolicy="no-referrer"
                    width={28}
                    height={28}
                  />
                ) : (
                  <span className="w-7 h-7 bg-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-full text-sm font-bold">
                    {(session.user?.name || session.user?.email || "U").charAt(0).toUpperCase()}
                  </span>
                )}
                <svg className="w-3 h-3 text-base-content/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-52 z-50">
                <li className="menu-title text-xs text-base-content/40 px-2 py-1">
                  {session.user?.email}
                </li>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-400"
                  >
                    🚪 Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Audits This Month", value: audits.length, icon: "📊", limit: "/ 3 free" },
            { label: "Average Score", value: Math.round(audits.reduce((s, a) => s + a.totalScore, 0) / audits.length), icon: "⚡" },
            { label: "Profiles Monitored", value: audits.filter((a) => a.alertEnabled).length, icon: "🔔" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-xs text-base-content/50 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                {stat.limit && (
                  <span className="text-xs text-base-content/40">{stat.limit}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Audit List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            📋 Saved Audits
          </h2>

          {audits.map((audit) => {
            const gradeClass = GRADE_COLORS[audit.grade] || GRADE_COLORS.C;
            const color = SCORE_COLORS[audit.grade] || "#f59e0b";

            return (
              <Link
                key={audit.id}
                href={`/audit/${audit.id}`}
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
                      strokeDashoffset={2 * Math.PI * 24 * (1 - audit.totalScore / 100)}
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
                  <span className={audit.alertEnabled ? "text-emerald-400" : ""}>
                    {audit.alertEnabled ? "🔔 Monitoring" : "🔕 Off"}
                  </span>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-base-content/20 group-hover:text-emerald-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            );
          })}
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
