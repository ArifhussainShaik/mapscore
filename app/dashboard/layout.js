// Dashboard layout — auth is handled client-side by the page component.
// The page uses useSession() to show a branded login prompt when unauthenticated,
// instead of redirecting to the generic NextAuth sign-in page.
export default function LayoutDashboard({ children }) {
  return <>{children}</>;
}
