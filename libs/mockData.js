/**
 * Mock data for development and demo purposes.
 * Simulates a real business audit for "Austin Premier Plumbing" in Austin, TX.
 */

export function getMockAuditData() {
    return {
        businessName: "Austin Premier Plumbing",
        businessAddress: "4521 Congress Ave, Austin, TX 78745",
        googlePlaceId: "ChIJLwPMoJm1RIYRx0lq_PAT2cQ",
        primaryCategory: "Plumber",
        secondaryCategories: ["Water Heater Installation Service"],
        description:
            "Austin Premier Plumbing has been serving the Austin metro area for over 12 years. We specialize in residential and commercial plumbing repairs, water heater installation, drain cleaning, and emergency plumbing services.",
        phone: "(512) 555-0198",
        websiteUrl: "https://austinpremierplumbing.com",
        hours: {
            monday: "7:00 AM - 6:00 PM",
            tuesday: "7:00 AM - 6:00 PM",
            wednesday: "7:00 AM - 6:00 PM",
            thursday: "7:00 AM - 6:00 PM",
            friday: "7:00 AM - 6:00 PM",
            saturday: "8:00 AM - 2:00 PM",
        },
        attributes: {
            "Wheelchair accessible": true,
            "Online estimates": true,
            "Onsite services": true,
        },
        services: [
            { name: "Drain Cleaning", description: "Professional drain unclogging and cleaning services" },
            { name: "Water Heater Installation", description: "Tank and tankless water heater installation" },
            { name: "Pipe Repair", description: "Burst and leaking pipe repair" },
            { name: "Faucet Repair", description: "Kitchen and bathroom faucet repair and replacement" },
        ],
        photoCount: 18,
        ownerPhotoCount: 8,
        hasLogo: true,
        hasCoverPhoto: false,
        reviewCount: 87,
        averageRating: 4.6,
        recentReviewDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
        monthlyReviewVelocity: 3.2,
        responseRate: 0.45,
        lastPostDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
        postFrequency: "monthly",
        websiteHttps: true,
        websiteLoads: true,
        websiteMobile: true,
        websiteHasNap: false,
        competitors: [
            {
                name: "Radiant Plumbing & Air",
                category: "Plumber",
                reviewCount: 312,
                rating: 4.9,
                photoCount: 85,
                postActivity: "weekly",
            },
            {
                name: "Stan's Heating, Air & Plumbing",
                category: "Plumber",
                reviewCount: 245,
                rating: 4.7,
                photoCount: 42,
                postActivity: "weekly",
            },
            {
                name: "ABC Home & Commercial Services",
                category: "Plumber",
                reviewCount: 198,
                rating: 4.5,
                photoCount: 55,
                postActivity: "monthly",
            },
        ],
    };
}

export function getMockSearchResults() {
    return [
        {
            placeId: "ChIJLwPMoJm1RIYRx0lq_PAT2cQ",
            name: "Austin Premier Plumbing",
            address: "4521 Congress Ave, Austin, TX 78745",
            category: "Plumber",
            rating: 4.6,
            reviewCount: 87,
        },
        {
            placeId: "ChIJLwPMoJm1RIYRx0lq_PAT2cB",
            name: "Austin Plumbing Experts",
            address: "2100 S Lamar Blvd, Austin, TX 78704",
            category: "Plumber",
            rating: 4.3,
            reviewCount: 54,
        },
        {
            placeId: "ChIJLwPMoJm1RIYRx0lq_PAT2cC",
            name: "Premier Plumbing Austin",
            address: "8900 N I-35, Austin, TX 78753",
            category: "Plumber",
            rating: 4.8,
            reviewCount: 122,
        },
    ];
}

/**
 * Get a pre-scored mock audit result for the demo page.
 */
export function getMockScoredAudit() {
    const data = getMockAuditData();

    return {
        id: "demo",
        ...data,
        totalScore: 62,
        grade: "C",
        sectionScores: {
            profile: 21,
            reviews: 16,
            visual: 7,
            activity: 4,
            website: 8,
            competitive: 6,
        },
        issues: [
            {
                id: "PROF-001",
                severity: "critical",
                section: "Profile",
                name: "Few services listed",
                description: "Your profile has only 4 services listed. Top-performing profiles in your category have 10+ services.",
                whyItMatters: "Sterling Sky testing confirmed that adding services has direct ranking impact. Effects appear within 24-72 hours. Pre-defined services from Google have stronger impact than custom services.",
                howToFix: [
                    "Go to Google Search and type 'my business'",
                    "Click 'Edit Services'",
                    "Check all relevant pre-defined services Google suggests",
                    "Add custom services for anything not covered",
                    "Write a 300-character description for each service",
                ],
                timeToFix: "30 minutes",
                expectedImpact: "High",
                timeToResults: "24-72 hours",
            },
            {
                id: "PROF-007",
                severity: "high",
                section: "Profile",
                name: "Only 1 secondary category",
                description: "You have only 1 secondary category. Aim for 3-5 relevant secondary categories.",
                whyItMatters: "Secondary categories expand the searches your business can appear in. Most top-ranking businesses use 3-5 secondary categories.",
                howToFix: [
                    "Go to Google Business Profile Manager",
                    "Edit your profile > Category",
                    "Add 2-4 more relevant secondary categories",
                ],
                timeToFix: "10 minutes",
                expectedImpact: "Medium-High",
                timeToResults: "24-72 hours",
            },
            {
                id: "REV-004",
                severity: "high",
                section: "Reviews",
                name: "Low owner response rate",
                description: "You've responded to only 45% of your reviews. Aim for 80%+ response rate.",
                whyItMatters: "Google has confirmed that responding to reviews shows you value your customers. It's a trust signal that can improve click-through rates and visibility.",
                howToFix: [
                    "Go to your Google Business Profile",
                    "Click on 'Reviews'",
                    "Respond to all unanswered reviews",
                    "Keep responses professional, personalized, and include a keyword naturally",
                ],
                timeToFix: "45 minutes",
                expectedImpact: "Medium",
                timeToResults: "1-2 weeks",
            },
            {
                id: "VIS-003",
                severity: "high",
                section: "Visual",
                name: "No cover photo set",
                description: "Your profile does not have a cover photo set. This is the first image customers see.",
                whyItMatters: "The cover photo is prominently displayed in search results and maps. A professional cover photo increases click-through rates by up to 35%.",
                howToFix: [
                    "Take or choose a high-quality photo of your business",
                    "Go to your Google Business Profile > Photos",
                    "Click 'Cover photo' and upload your image",
                    "Use a 720x720px minimum resolution",
                ],
                timeToFix: "10 minutes",
                expectedImpact: "Medium",
                timeToResults: "Immediate",
            },
            {
                id: "VIS-002",
                severity: "medium",
                section: "Visual",
                name: "Under 20 photos",
                description: "You have 18 photos. Profiles with 50+ photos get 520% more calls (BrightLocal).",
                whyItMatters: "Photo quantity and quality is ranked #8 in local pack factors by Whitespark 2026. More photos = more engagement and trust.",
                howToFix: [
                    "Upload photos of your team, vehicles, completed work",
                    "Add interior and exterior business photos",
                    "Include before/after project photos",
                    "Aim for 50+ total photos",
                ],
                timeToFix: "1 hour",
                expectedImpact: "Medium",
                timeToResults: "1-7 days",
            },
            {
                id: "COMP-001",
                severity: "high",
                section: "Competitive",
                name: "Significant review gap",
                description: "Your top competitor has 312 reviews vs. your 87. That's a 225-review gap.",
                whyItMatters: "Search Atlas ML Study shows review count accounts for 26% of ranking variance for top 10 positions.",
                howToFix: [
                    "Implement a systematic review generation strategy",
                    "Ask satisfied customers for reviews after each job",
                    "Use follow-up emails with a direct review link",
                    "Target 4+ new reviews per month",
                ],
                timeToFix: "Ongoing",
                expectedImpact: "Very High",
                timeToResults: "1-3 months",
            },
            {
                id: "WEB-001",
                severity: "medium",
                section: "Website",
                name: "No NAP on homepage",
                description: "Your business Name, Address, and Phone number were not found on your website's homepage.",
                whyItMatters: "NAP consistency between your GBP and website is a key local SEO signal. Whitespark 2026 ranks it as a top factor.",
                howToFix: [
                    "Add your full business name, address, and phone to your homepage footer",
                    "Use Schema.org LocalBusiness markup",
                    "Ensure it matches your GBP listing exactly",
                ],
                timeToFix: "20 minutes",
                expectedImpact: "Medium",
                timeToResults: "1-4 weeks",
            },
            {
                id: "ACT-001",
                severity: "medium",
                section: "Activity",
                name: "No post in last 7 days",
                description: "Your last post was 25 days ago. Top competitors post weekly.",
                whyItMatters: "Regular posting signals an active, engaged business. Posts appear in search results and can drive direct actions.",
                howToFix: [
                    "Create a weekly GBP posting schedule",
                    "Share updates, offers, events, or tips",
                    "Include a call-to-action in each post",
                    "Add a relevant photo to every post",
                ],
                timeToFix: "15 minutes per post",
                expectedImpact: "Medium",
                timeToResults: "1-2 weeks",
            },
        ],
        actionPlan: {
            doToday: [
                { action: "Add 6+ more services to your GBP profile", timeEstimate: "30 min", impact: "High", issueId: "PROF-001" },
                { action: "Set a cover photo for your profile", timeEstimate: "10 min", impact: "Medium", issueId: "VIS-003" },
                { action: "Add 2-4 more secondary categories", timeEstimate: "10 min", impact: "Medium-High", issueId: "PROF-007" },
            ],
            thisMonth: [
                { action: "Respond to all unanswered reviews", timeEstimate: "45 min", impact: "Medium", issueId: "REV-004" },
                { action: "Upload 30+ new photos", timeEstimate: "1 hour", impact: "Medium", issueId: "VIS-002" },
                { action: "Add NAP to website homepage", timeEstimate: "20 min", impact: "Medium", issueId: "WEB-001" },
                { action: "Create and publish a GBP post", timeEstimate: "15 min", impact: "Medium", issueId: "ACT-001" },
            ],
            ongoing: [
                { action: "Generate 4+ reviews per month", timeEstimate: "Ongoing", impact: "Very High", issueId: "COMP-001" },
                { action: "Post to GBP weekly", timeEstimate: "15 min/week", impact: "Medium", issueId: "ACT-001" },
                { action: "Respond to new reviews within 24 hours", timeEstimate: "5 min/review", impact: "Medium", issueId: "REV-004" },
            ],
        },
        createdAt: new Date().toISOString(),
    };
}

/**
 * Mock saved audits for dashboard demo.
 */
export function getMockSavedAudits() {
    return [
        {
            id: "demo-1",
            businessName: "Austin Premier Plumbing",
            businessAddress: "4521 Congress Ave, Austin, TX",
            totalScore: 62,
            grade: "C",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            alertEnabled: true,
        },
        {
            id: "demo-2",
            businessName: "Lakeway Electric Co",
            businessAddress: "1200 Lakeway Dr, Lakeway, TX",
            totalScore: 78,
            grade: "B",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            alertEnabled: false,
        },
        {
            id: "demo-3",
            businessName: "Hill Country HVAC",
            businessAddress: "3400 Bee Caves Rd, Austin, TX",
            totalScore: 41,
            grade: "D",
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            alertEnabled: true,
        },
    ];
}
