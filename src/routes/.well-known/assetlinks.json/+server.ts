import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const packageName =
    url.searchParams.get("package") || "com.srizan.example.navigation";
  const sha256 =
    url.searchParams.get("sha256") ||
    "B1:07:82:1F:70:EB:06:AF:B2:78:89:A6:FA:F9:44:57:0D:44:27:4D:1E:91:96:3A:86:00:FF:DB:A5:6E:D1:D5";

  const fingerprints = sha256
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);

  const statements = fingerprints.map((fp) => ({
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: packageName,
      sha256_cert_fingerprints: [fp],
    },

    // Dynamic App Links (Android 15+ / API 35+)
    // These rules are fetched periodically and merged with manifest intent filters.
    // No app update needed — just change this file on the server.
    dynamic_app_deep_link_components: [
      // ── Include rules: paths the app SHOULD handle ──

      // Product detail pages — match /products/{id}
      {
        path: { pathAdvancedPattern: "/products/.*" },
        comment: "Open product detail screens in the app",
      },

      // Category pages — match /categories/{slug}
      {
        path: { pathAdvancedPattern: "/categories/.*" },
        comment: "Open category screens in the app",
      },

      // User profiles — match /profile/{username}
      {
        path: { pathAdvancedPattern: "/profile/.*" },
        comment: "Open user profile screens in the app",
      },

      // Deals page — exact match
      {
        path: { pathPrefix: "/deals" },
        comment: "Open deals screen in the app",
      },

      // Orders page (auth-gated) — tests the login-wall deep link flow
      {
        path: { pathPrefix: "/orders" },
        comment: "Open orders screen — app must handle unauthenticated state",
      },

      // Error test routes — included so the app receives the link and handles HTTP errors
      {
        path: { pathPrefix: "/errors" },
        comment: "Error scenario routes — app must handle 404/403/500/slow/expired gracefully",
      },

      // Redirect hub page
      {
        path: { pathPrefix: "/redirects" },
        comment: "Redirect test documentation page",
      },

      // Share/promo codes — match /share/{code}
      {
        path: { pathAdvancedPattern: "/share/.*" },
        comment: "Open share/promo code screens in the app",
      },

      // ── Query parameter matching ──

      // Products with ?ref= query param — attribute referral source
      {
        path: { pathAdvancedPattern: "/products/.*" },
        queryParameters: [{ key: "ref", value: ".*" }],
        comment: "Products opened via referral link — track ref param",
      },

      // Products list with search — ?q= and ?sort=
      {
        path: { pathLiteral: "/products" },
        queryParameters: [{ key: "q", value: ".*" }],
        comment: "Product search results — open in app with search query",
      },

      // ── Fragment matching ──

      // Category pages with fragment (e.g. /categories/electronics#featured)
      {
        path: { pathAdvancedPattern: "/categories/.*" },
        fragment: { fragmentAdvancedPattern: ".*" },
        comment: "Category pages with section fragments",
      },

      // ── Exclude rules: paths the app should NOT handle ──

      // Don't open /setup in the app — that's a web-only config page
      {
        path: { pathPrefix: "/setup" },
        exclude: true,
        comment: "Setup page is web-only, don't open in app",
      },

      // Don't open the assetlinks endpoint itself
      {
        path: { pathPrefix: "/.well-known" },
        exclude: true,
        comment: "DAL file endpoint — always serve from web",
      },

      // Exclude any URL with ?no_app_link=true (useful for A/B testing)
      {
        path: { pathAdvancedPattern: "/.*" },
        queryParameters: [{ key: "no_app_link", value: "true" }],
        exclude: true,
        comment:
          "A/B test escape hatch — adding ?no_app_link=true keeps user in browser",
      },

      // Exclude seasonal promo that has ended (dynamic removal example)
      // Uncomment to activate, comment out when promo is live:
      // {
      //   path: { pathLiteral: "/share/SUMMER2024" },
      //   exclude: true,
      //   comment: "Summer 2024 promo ended — don't open in app",
      // },
    ],
  }));

  return json(statements, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
