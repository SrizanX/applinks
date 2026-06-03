<script lang="ts">
	import { page } from '$app/state';

	const deals = [
		{ id: 1, productId: 1, name: 'Wireless Headphones', image: '🎧', originalPrice: 79.99, salePrice: 59.99, discount: 25 },
		{ id: 2, productId: 5, name: 'Bluetooth Speaker', image: '🔊', originalPrice: 59.99, salePrice: 39.99, discount: 33 },
		{ id: 3, productId: 7, name: 'Wireless Charger', image: '🔋', originalPrice: 29.99, salePrice: 19.99, discount: 33 },
		{ id: 4, productId: 4, name: 'USB-C Hub', image: '🔌', originalPrice: 34.99, salePrice: 24.99, discount: 29 },
	];
</script>

<svelte:head>
	<title>Deals — ShopLink</title>
</svelte:head>

<h1>🔥 Today's Deals</h1>
<p class="subtitle">Limited time offers. Route: <code>/deals</code></p>

<div class="deals-grid">
	{#each deals as deal}
		<a href="/products/{deal.productId}" class="card deal-card">
			<div class="discount-badge">-{deal.discount}%</div>
			<div class="deal-image">{deal.image}</div>
			<h3>{deal.name}</h3>
			<div class="prices">
				<span class="original">${deal.originalPrice}</span>
				<span class="sale">${deal.salePrice}</span>
			</div>
		</a>
	{/each}
</div>

<div class="route-info card" style="margin-top: 24px">
	<strong>Route:</strong> <code>/deals</code><br />
	<strong>Full URL:</strong> <code>{page.url.href}</code><br />
	<small>A simple static route. Your Android app can handle <code>/deals</code> with a plain <code>pathPrefix="/deals"</code> or <code>path="/deals"</code>.</small>
</div>

<style>
	h1 {
		font-size: 1.8rem;
		margin-bottom: 8px;
	}

	.subtitle {
		color: var(--text-muted);
		margin-bottom: 28px;
	}

	.deals-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
	}

	.deal-card {
		display: block;
		text-align: center;
		transition: all 0.2s;
		position: relative;
		overflow: hidden;
	}

	.deal-card:hover {
		transform: translateY(-2px);
		border-color: var(--orange);
	}

	.discount-badge {
		position: absolute;
		top: 12px;
		right: 12px;
		background: var(--red);
		color: white;
		padding: 4px 10px;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.deal-image {
		font-size: 3rem;
		margin-bottom: 12px;
	}

	.deal-card h3 {
		font-size: 0.95rem;
		margin-bottom: 8px;
	}

	.prices {
		display: flex;
		justify-content: center;
		gap: 10px;
		align-items: center;
	}

	.original {
		text-decoration: line-through;
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.sale {
		color: var(--green);
		font-weight: 700;
		font-size: 1.1rem;
	}

	.route-info {
		padding: 14px;
		font-size: 0.8rem;
		border: 1px dashed var(--border);
	}

	.route-info small {
		color: var(--text-muted);
	}
</style>
