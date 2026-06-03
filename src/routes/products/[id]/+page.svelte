<script lang="ts">
	import { page } from '$app/state';

	const products: Record<string, { name: string; price: number; image: string; category: string; description: string; specs: string[] }> = {
		'1': { name: 'Wireless Headphones', price: 79.99, image: '🎧', category: 'audio', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features adaptive ANC, transparency mode, and multipoint Bluetooth connection.', specs: ['Bluetooth 5.2', '30-hour battery', 'Active Noise Cancellation', 'USB-C charging', '40mm drivers'] },
		'2': { name: 'Smart Watch', price: 199.99, image: '⌚', category: 'electronics', description: 'Fitness tracking smartwatch with heart rate monitor, GPS, and 5-day battery life. Water resistant to 50 meters.', specs: ['Heart rate monitor', 'Built-in GPS', '5-day battery', 'Water resistant 50m', 'AMOLED display'] },
		'3': { name: 'Laptop Stand', price: 49.99, image: '💻', category: 'accessories', description: 'Ergonomic aluminum laptop stand with adjustable height. Compatible with laptops up to 17 inches.', specs: ['Aluminum alloy', 'Adjustable height', 'Up to 17" laptops', 'Cable management', 'Non-slip base'] },
		'4': { name: 'USB-C Hub', price: 34.99, image: '🔌', category: 'accessories', description: '7-in-1 USB-C hub with HDMI 4K output, SD/microSD card readers, and 3x USB 3.0 ports.', specs: ['HDMI 4K@60Hz', 'SD/microSD slots', '3x USB 3.0', '100W PD passthrough', 'Plug and play'] },
		'5': { name: 'Bluetooth Speaker', price: 59.99, image: '🔊', category: 'audio', description: 'Portable waterproof Bluetooth speaker with deep bass. IP67 rated for outdoor adventures.', specs: ['IP67 waterproof', '12-hour battery', 'Bluetooth 5.3', 'Stereo pairing', 'Built-in mic'] },
		'6': { name: 'Mechanical Keyboard', price: 129.99, image: '⌨️', category: 'accessories', description: 'RGB mechanical keyboard with Cherry MX switches. Full NKRO with programmable macros.', specs: ['Cherry MX switches', 'Per-key RGB', 'Full NKRO', 'USB-C detachable', 'PBT keycaps'] },
		'7': { name: 'Wireless Charger', price: 29.99, image: '🔋', category: 'electronics', description: 'Fast wireless charging pad compatible with all Qi devices. Supports 15W fast charge.', specs: ['15W fast charge', 'Qi compatible', 'LED indicator', 'Over-charge protection', 'Slim design'] },
		'8': { name: 'Webcam HD', price: 89.99, image: '📷', category: 'electronics', description: '1080p HD webcam with built-in microphone and auto-focus. Perfect for video calls and streaming.', specs: ['1080p 60fps', 'Auto-focus', 'Dual microphones', 'Privacy cover', 'Tripod mount'] },
	};

	const id = $derived(page.params.id);
	const product = $derived(products[id]);
	const ref = $derived(page.url.searchParams.get('ref'));
</script>

<svelte:head>
	<title>{product ? product.name : 'Product Not Found'} — ShopLink</title>
</svelte:head>

{#if product}
	<div class="breadcrumb">
		<a href="/">Home</a> / <a href="/products">Products</a> / <a href="/categories/{product.category}">{product.category}</a> / {product.name}
	</div>

	{#if ref}
		<div class="ref-banner card">
			Referred from: <code>{ref}</code> — This value came from the <code>?ref=</code> query parameter.
		</div>
	{/if}

	<div class="product-detail">
		<div class="product-hero">
			<div class="product-image">{product.image}</div>
		</div>
		<div class="product-info">
			<span class="category-tag">{product.category}</span>
			<h1>{product.name}</h1>
			<p class="price">${product.price}</p>
			<p class="description">{product.description}</p>

			<div class="specs">
				<h3>Specifications</h3>
				<ul>
					{#each product.specs as spec}
						<li>{spec}</li>
					{/each}
				</ul>
			</div>

			<button class="btn btn-primary" style="width:100%">Add to Cart</button>

			<div class="route-info card">
				<strong>Route:</strong> <code>/products/{id}</code><br />
				<strong>Full URL:</strong> <code>{page.url.href}</code><br />
				{#if ref}<strong>Query param ref:</strong> <code>{ref}</code><br />{/if}
				<small>Try: <a href="/products/{id}?ref=homepage">/products/{id}?ref=homepage</a> | <a href="/products/{id}?ref=share">/products/{id}?ref=share</a></small>
			</div>
		</div>
	</div>
{:else}
	<div class="not-found card">
		<h1>Product Not Found</h1>
		<p>No product with ID <code>{id}</code>. Try <a href="/products">browsing all products</a>.</p>
		<div class="route-info" style="margin-top: 16px">
			<strong>Route:</strong> <code>/products/{id}</code><br />
			<small>Your Android app would need to handle this case gracefully.</small>
		</div>
	</div>
{/if}

<style>
	.breadcrumb {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.product-detail {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 32px;
	}

	.product-hero {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
	}

	.product-image {
		font-size: 8rem;
	}

	.category-tag {
		display: inline-block;
		background: rgba(56, 189, 248, 0.15);
		color: var(--accent);
		padding: 2px 10px;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		margin-bottom: 8px;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 8px;
	}

	.price {
		font-size: 1.5rem;
		color: var(--green);
		font-weight: 700;
		margin-bottom: 16px;
	}

	.description {
		color: var(--text-muted);
		margin-bottom: 20px;
		font-size: 0.95rem;
	}

	.specs {
		margin-bottom: 24px;
	}

	.specs h3 {
		font-size: 0.95rem;
		margin-bottom: 8px;
	}

	.specs ul {
		list-style: none;
		padding: 0;
	}

	.specs li {
		padding: 6px 0;
		font-size: 0.85rem;
		color: var(--text-muted);
		border-bottom: 1px solid var(--border);
	}

	.specs li::before {
		content: '✓ ';
		color: var(--green);
	}

	.route-info {
		margin-top: 20px;
		padding: 14px;
		font-size: 0.8rem;
		background: var(--bg);
		border-radius: var(--radius);
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
	}

	@media (max-width: 700px) {
		.product-detail {
			grid-template-columns: 1fr;
		}
	}

	.ref-banner {
		padding: 10px 16px;
		margin-bottom: 16px;
		font-size: 0.85rem;
		background: var(--card-bg);
		border-left: 3px solid var(--accent);
	}
</style>
