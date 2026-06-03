import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Redirect map: code → { status, target }
// 301 = Permanent (browser caches it), 302 = Temporary, 307 = Temp (preserves method), 308 = Permanent (preserves method)
const redirects: Record<string, { status: 301 | 302 | 307 | 308; target: string }> = {
	// ── Simple redirects ──
	deals: { status: 302, target: '/deals' },
	product1: { status: 302, target: '/products/1' },
	product2: { status: 302, target: '/products/2' },
	electronics: { status: 302, target: '/categories/electronics' },
	audio: { status: 302, target: '/categories/audio' },

	// ── Permanent redirect (301) — simulates a renamed/moved route ──
	'old-deals': { status: 301, target: '/deals' },
	'old-product': { status: 301, target: '/products/1' },

	// ── Redirect chains (multi-hop) ──
	// Android's HttpURLConnection follows up to 5 hops by default; OkHttp allows 20.
	// Your app must handle each hop correctly, especially across http→https.
	chain: { status: 302, target: '/r/product1' }, // 2 hops: /r/chain → /r/product1 → /products/1
	triple: { status: 302, target: '/r/chain' }, // 3 hops: /r/triple → /r/chain → /r/product1 → /products/1

	// ── Redirect loop — tests that the HTTP client (OkHttp/Retrofit) bails out gracefully ──
	loop1: { status: 302, target: '/r/loop2' },
	loop2: { status: 302, target: '/r/loop1' },
};

// Gone codes: 410 Gone — resource permanently removed, client should not retry
const goneKeys = new Set(['summer2023', 'xmas2024', 'deleted-promo']);

export const GET: RequestHandler = async ({ params }) => {
	const { code } = params;

	if (goneKeys.has(code)) {
		error(410, `"${code}" has been permanently removed. This link is no longer valid.`);
	}

	const entry = redirects[code];
	if (!entry) {
		error(404, `Redirect code "${code}" not found. Valid codes: ${Object.keys(redirects).join(', ')}`);
	}

	redirect(entry.status, entry.target);
};
