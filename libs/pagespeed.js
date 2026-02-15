/**
 * Google PageSpeed Insights API integration.
 * Provides website performance and mobile-readiness checks.
 *
 * API docs: https://developers.google.com/speed/docs/insights/v5/get-started
 * Free: No billing required for PageSpeed Insights API.
 */

const PAGESPEED_API_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

/**
 * Check if PageSpeed API is configured (API key is optional but recommended).
 */
export function isPageSpeedConfigured() {
    // PageSpeed works without an API key (lower rate limits), so always "configured"
    return true;
}

/**
 * Run a PageSpeed check on a website URL.
 *
 * @param {string} url - The website URL to check
 * @returns {Promise<Object>} Website check results
 */
export async function checkWebsite(url) {
    if (!url) {
        return getDefaultResult();
    }

    // Normalize URL
    let normalizedUrl = url;
    if (!normalizedUrl.startsWith("http")) {
        normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
        console.log(`[PageSpeed] Checking: ${normalizedUrl}`);

        // Run both mobile and desktop checks in parallel
        const [mobileResult, desktopResult] = await Promise.allSettled([
            fetchPageSpeed(normalizedUrl, "mobile"),
            fetchPageSpeed(normalizedUrl, "desktop"),
        ]);

        const mobile = mobileResult.status === "fulfilled" ? mobileResult.value : null;
        const desktop = desktopResult.status === "fulfilled" ? desktopResult.value : null;

        const result = {
            httpsValid: normalizedUrl.startsWith("https"),
            websiteLoads: !!(mobile || desktop),
            mobileResponsive: true, // default
            mobileScore: null,
            desktopScore: null,
            loadSpeed: null,
            mobileFriendly: true,
        };

        if (mobile) {
            const mobileScore = mobile.lighthouseResult?.categories?.performance?.score;
            result.mobileScore = mobileScore != null ? Math.round(mobileScore * 100) : null;
            result.mobileResponsive = result.mobileScore == null || result.mobileScore > 30;
            result.mobileFriendly = result.mobileScore == null || result.mobileScore > 50;

            // Extract load speed from metrics
            const fcp = mobile.lighthouseResult?.audits?.["first-contentful-paint"]?.numericValue;
            if (fcp) {
                result.loadSpeed = Math.round(fcp); // in milliseconds
            }
        }

        if (desktop) {
            const desktopScore = desktop.lighthouseResult?.categories?.performance?.score;
            result.desktopScore = desktopScore != null ? Math.round(desktopScore * 100) : null;
        }

        console.log(
            `[PageSpeed] Results: mobile=${result.mobileScore}, desktop=${result.desktopScore}, ` +
            `https=${result.httpsValid}, loads=${result.websiteLoads}`
        );

        return result;
    } catch (error) {
        console.error("[PageSpeed] Check failed:", error.message);
        // Fallback to basic URL checks
        return {
            httpsValid: normalizedUrl.startsWith("https"),
            websiteLoads: true, // Assume it loads if we can't check
            mobileResponsive: true,
            mobileScore: null,
            desktopScore: null,
            loadSpeed: null,
            mobileFriendly: true,
        };
    }
}

/**
 * Fetch PageSpeed data from the API.
 */
async function fetchPageSpeed(url, strategy = "mobile") {
    const params = new URLSearchParams({
        url,
        strategy,
        category: "performance",
    });

    // Add API key if configured (optional, but increases rate limit)
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (apiKey) {
        params.set("key", apiKey);
    }

    const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`, {
        // PageSpeed can be slow — set a generous timeout via AbortController
        signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PageSpeed] API error (${response.status}, ${strategy}):`, errorText.slice(0, 200));
        throw new Error(`PageSpeed API returned ${response.status}`);
    }

    return response.json();
}

/**
 * Default result when no URL is provided.
 */
function getDefaultResult() {
    return {
        httpsValid: false,
        websiteLoads: false,
        mobileResponsive: false,
        mobileScore: null,
        desktopScore: null,
        loadSpeed: null,
        mobileFriendly: false,
    };
}
