<script lang="ts">
	import { page } from '$app/state';

	const shares: Record<string, { type: string; title: string; description: string; link: string }> = {
		SUMMER2024: { type: 'promo', title: 'Summer Sale 2024', description: 'Get 30% off on all audio products!', link: '/categories/audio' },
		NEWUSER10: { type: 'promo', title: 'New User Discount', description: 'Welcome! Use this code for 10% off your first order.', link: '/products' },
		PROD1SHARE: { type: 'product', title: 'Check out these Headphones!', description: 'John shared Wireless Headphones with you.', link: '/products/1' },
		TECHGURU: { type: 'profile', title: 'Follow Tech Guru', description: 'Check out Tech Guru\'s profile and reviews.', link: '/profile/techguru' },
	};

	const code = $derived(page.params.code);
	const share = $derived(shares[code]);
</script>

<svelte:head>
	<title>{share ? share.title : 'Invalid Link'} — ShopLink</title>
</svelte:head>

{#if share}
	<div class="share-page">
		<div class="share-card card">
			<div class="share-type badge" class:badge-green={share.type === 'promo'} class:badge-blue={share.type === 'product'} class:badge-orange={share.type === 'profile'}>
				{share.type}
			</div>
			<h1>{share.title}</h1>
			<p>{share.description}</p>
			<a href={share.link} class="btn btn-primary">Go to Content →</a>
		</div>

		<div class="route-info card">
			<strong>Route:</strong> <code>/share/{code}</code><br />
			<strong>Full URL:</strong> <code>{page.url.href}</code><br />
			<small>Share links are common in apps. Users share product/promo links that deep-link back into the app. Your Android app extracts the code "<strong>{code}</strong>" and resolves it.</small>
		</div>
	</div>
{:else}
	<div class="not-found card">
		<h1>Invalid Share Link</h1>
		<p>The code "<code>{code}</code>" is not valid. Try these:</p>
		<div class="try-links">
			<a href="/share/SUMMER2024"><code>/share/SUMMER2024</code></a>
			<a href="/share/NEWUSER10"><code>/share/NEWUSER10</code></a>
			<a href="/share/PROD1SHARE"><code>/share/PROD1SHARE</code></a>
			<a href="/share/TECHGURU"><code>/share/TECHGURU</code></a>
		</div>
	</div>
{/if}

<style>
	.share-page {
		max-width: 500px;
		margin: 0 auto;
	}

	.share-card {
		text-align: center;
		padding: 40px;
		margin-bottom: 16px;
	}

	.share-type {
		margin-bottom: 16px;
	}

	h1 {
		font-size: 1.6rem;
		margin-bottom: 12px;
	}

	.share-card p {
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.route-info {
		padding: 14px;
		font-size: 0.8rem;
		border: 1px dashed var(--border);
	}

	.route-info small {
		color: var(--text-muted);
	}

	.not-found {
		text-align: center;
		padding: 48px;
	}

	.not-found p {
		color: var(--text-muted);
		margin-top: 8px;
		margin-bottom: 16px;
	}

	.try-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
	}

	.try-links a {
		padding: 8px 16px;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 0.85rem;
	}

	.try-links a:hover {
		border-color: var(--accent);
	}

	.badge-green {
		background: rgba(74, 222, 128, 0.15);
		color: var(--green);
	}

	.badge-blue {
		background: rgba(56, 189, 248, 0.15);
		color: var(--accent);
	}

	.badge-orange {
		background: rgba(251, 146, 60, 0.15);
		color: var(--orange);
	}
</style>
