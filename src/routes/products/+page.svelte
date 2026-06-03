<script lang="ts">
	import { page } from '$app/state';

	const allProducts = [
		{ id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'audio', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.' },
		{ id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', category: 'electronics', description: 'Fitness tracking smartwatch with heart rate monitor and GPS.' },
		{ id: 3, name: 'Laptop Stand', price: 49.99, image: '💻', category: 'accessories', description: 'Ergonomic aluminum laptop stand with adjustable height.' },
		{ id: 4, name: 'USB-C Hub', price: 34.99, image: '🔌', category: 'accessories', description: '7-in-1 USB-C hub with HDMI, SD card, and USB 3.0 ports.' },
		{ id: 5, name: 'Bluetooth Speaker', price: 59.99, image: '🔊', category: 'audio', description: 'Portable waterproof Bluetooth speaker with deep bass.' },
		{ id: 6, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', category: 'accessories', description: 'RGB mechanical keyboard with Cherry MX switches.' },
		{ id: 7, name: 'Wireless Charger', price: 29.99, image: '🔋', category: 'electronics', description: 'Fast wireless charging pad compatible with all Qi devices.' },
		{ id: 8, name: 'Webcam HD', price: 89.99, image: '📷', category: 'electronics', description: '1080p HD webcam with built-in microphone and auto-focus.' },
	];

	const q = $derived(page.url.searchParams.get('q') ?? '');
	const sort = $derived(page.url.searchParams.get('sort') ?? '');
	const categoryFilter = $derived(page.url.searchParams.get('category') ?? '');

	const products = $derived.by(() => {
		let result = allProducts;
		if (q) {
			const lower = q.toLowerCase();
			result = result.filter(p => p.name.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower));
		}
		if (categoryFilter) {
			result = result.filter(p => p.category === categoryFilter);
		}
		if (sort === 'price_asc') {
			result = [...result].sort((a, b) => a.price - b.price);
		} else if (sort === 'price_desc') {
			result = [...result].sort((a, b) => b.price - a.price);
		} else if (sort === 'name') {
			result = [...result].sort((a, b) => a.name.localeCompare(b.name));
		}
		return result;
	});
</script>

<h1>All Products</h1>
<p class="subtitle">
	Supports query params: <code>?q=</code> (search), <code>?sort=price_asc|price_desc|name</code>, <code>?category=</code> (filter)
</p>

{#if q || sort || categoryFilter}
	<div class="active-filters card">
		<strong>Active filters:</strong>
		{#if q}<span class="filter-tag">q="{q}"</span>{/if}
		{#if sort}<span class="filter-tag">sort={sort}</span>{/if}
		{#if categoryFilter}<span class="filter-tag">category={categoryFilter}</span>{/if}
		<a href="/products" class="clear-link">Clear all</a>
	</div>
{/if}

<div class="filter-bar">
	<a href="/products?sort=price_asc" class="btn-filter" class:active={sort === 'price_asc'}>Price ↑</a>
	<a href="/products?sort=price_desc" class="btn-filter" class:active={sort === 'price_desc'}>Price ↓</a>
	<a href="/products?sort=name" class="btn-filter" class:active={sort === 'name'}>A–Z</a>
	<a href="/products?category=electronics" class="btn-filter" class:active={categoryFilter === 'electronics'}>Electronics</a>
	<a href="/products?category=audio" class="btn-filter" class:active={categoryFilter === 'audio'}>Audio</a>
	<a href="/products?category=accessories" class="btn-filter" class:active={categoryFilter === 'accessories'}>Accessories</a>
</div>

<p class="result-count">{products.length} product{products.length !== 1 ? 's' : ''} found</p>

<div class="product-grid">
	{#each products as product}
		<a href="/products/{product.id}" class="card product-card">
			<div class="product-image">{product.image}</div>
			<h3>{product.name}</h3>
			<p class="description">{product.description}</p>
			<div class="product-footer">
				<span class="price">${product.price}</span>
				<span class="route">/products/{product.id}</span>
			</div>
		</a>
	{/each}
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

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 16px;
	}

	.product-card {
		display: block;
		text-align: center;
		transition: all 0.2s;
	}

	.product-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
	}

	.product-image {
		font-size: 3rem;
		margin-bottom: 12px;
	}

	.product-card h3 {
		font-size: 0.95rem;
		margin-bottom: 6px;
	}

	.description {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 12px;
	}

	.product-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10px;
		border-top: 1px solid var(--border);
	}

	.price {
		color: var(--green);
		font-weight: 600;
	}

	.route {
		font-size: 0.7rem;
		font-family: monospace;
		color: var(--text-muted);
		background: var(--bg);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.active-filters {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 16px;
		padding: 12px 16px;
	}

	.filter-tag {
		background: var(--accent);
		color: var(--bg);
		padding: 2px 8px;
		border-radius: 4px;
		font-size: 0.8rem;
		font-family: monospace;
	}

	.clear-link {
		font-size: 0.8rem;
		margin-left: auto;
	}

	.filter-bar {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 16px;
	}

	.btn-filter {
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 0.8rem;
		background: var(--card-bg);
		border: 1px solid var(--border);
		color: var(--text);
		text-decoration: none;
	}

	.btn-filter.active {
		background: var(--accent);
		color: var(--bg);
		border-color: var(--accent);
	}

	.result-count {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 16px;
	}
</style>
