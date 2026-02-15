// Middleware — intentionally minimal.
// Authentication is handled per-page via useSession() hooks.
// The dashboard page renders its own branded login prompt when unauthenticated.
// We do NOT use NextAuth middleware here to prevent automatic redirects.

export function middleware() {
  // No-op — let pages handle auth themselves
}

export const config = {
  // Only match routes that need middleware processing (currently none)
  matcher: [],
}
