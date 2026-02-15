const config = {
  // REQUIRED
  appName: "Mapscore.io",
  // REQUIRED: a short description of your app for SEO tags
  appDescription:
    "How healthy is your Google Business Profile? Get a scored audit report with prioritized fixes, competitor comparison, and downloadable PDF in 30 seconds.",
  // REQUIRED (no https://, no trailing slash)
  domainName: "mapscore.io",
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  dodo: {
    plans: [
      {
        isFeatured: true,
        productId:
          process.env.NODE_ENV === "development"
            ? "prd_test_pro_plan"
            : "prd_live_pro_plan",
        name: "Pro",
        description: "For freelancers & consultants",
        price: 29,
        currency: "USD",
        interval: "month",
        features: [
          { name: "Unlimited audits" },
          { name: "Full detailed reports" },
          { name: "PDF export" },
          { name: "Competitor comparison (top 3)" },
          { name: "Weekly re-scan alerts" },
          { name: "Priority action list" },
        ],
      },
      {
        productId:
          process.env.NODE_ENV === "development"
            ? "prd_test_agency_plan"
            : "prd_live_agency_plan",
        name: "Agency",
        description: "For teams & agencies",
        price: 79,
        currency: "USD",
        interval: "month",
        features: [
          { name: "Everything in Pro" },
          { name: "Bulk audit (50 profiles)" },
          { name: "Custom branding on PDFs" },
          { name: "Client-ready presentation" },
          { name: "API access" },
        ],
      },
    ],
  },
  aws: {
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    fromNoReply: `Mapscore <noreply@mapscore.io>`,
    fromAdmin: `Mapscore Team <team@mapscore.io>`,
    supportEmail: "support@mapscore.io",
  },
  colors: {
    theme: "dark",
    main: "#10b981",
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
  // Scoring
  scoring: {
    freeTierLimit: 3, // audits per month
    cacheDays: 7,
  },
};

export default config;
