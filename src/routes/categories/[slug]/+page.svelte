<script lang="ts">
	import { page } from '$app/state';

	const categoryData: Record<string, { name: string; icon: string; description: string; products: { id: number; name: string; price: number; image: string }[] }> = {
		electronics: {
			name: 'Electronics',
			icon: '📱',
			description: 'Smart devices, chargers, and electronic gadgets.',
			products: [
				{ id: 2, name: 'Smart Watch', price: 199.99, image: '⌚' },
				{ id: 7, name: 'Wireless Charger', price: 29.99, image: '🔋' },
				{ id: 8, name: 'Webcam HD', price: 89.99, image: '📷' },
			]
		},
		accessories: {
			name: 'Accessories',
			icon: '🎒',
			description: 'Peripherals, stands, and useful add-ons for your setup.',
			products: [
				{ id: 3, name: 'Laptop Stand', price: 49.99, image: '💻' },
				{ id: 4, name: 'USB-C Hub', price: 34.99, image: '🔌' },
				{ id: 6, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
			]
		},
		audio: {
			name: 'Audio',
			icon: '🔊',
			description: 'Headphones, speakers, and audio equipment.',
			products: [
				{ id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧' },
				{ id: 5, name: 'Bluetooth Speaker', price: 59.99, image: '🔊' },
			]
		},
		wearables: {
			name: 'Wearables',
			icon: '⌚',
			description: 'Smartwatches and fitness tracking devices.',
			products: [
				{ id: 2, name: 'Smart Watch', price: 199.99, image: '⌚' },
			]
		},
		home: {
			name: 'Home & Office',
			icon: '🏠',
			description: 'Products for your home office and workspace.',
			products: [
				{ id: 3, name: 'Laptop Stand', price: 49.99, image: '💻' },
				{ id: 6, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
				{ id: 7, name: 'Wireless Charger', price: 29.99, image: '🔋' },
				{ id: 8, name: 'Webcam HD', price: 89.99, image: '📷' },
			]
		}
	};

	const slug = $derived(page.params.slug);
	const category = $derived(categoryData[slug]);
</script>

<svelte:head>
	<title>{category ? category.name : 'Category Not Found'} — ShopLink</title>
</svelte:head>

{#if category}
	<div class="breadcrumb">
		<a href="/">Home</a> / <a href="/categories">Categories</a> / {category.name}
	</div>

	<div class="header">
		<span class="icon">{category.icon}</span>
		<div>
			<h1>{category.name}</h1>
			<p>{category.description}</p>
		</div>
	</div>

	<div class="product-grid">
		{#each category.products as product}
			<a href="/products/{product.id}" class="card product-card">
				<div class="product-image">{product.image}</div>
				<h3>{product.name}</h3>
				<p class="price">${product.price}</p>
			</a>
		{/each}
	</div>

	<div class="route-info card">
		<strong>Route:</strong> <code>/categories/{slug}</code><br />
		<strong>Full URL:</strong> <code>{page.url.href}</code><br />
		<small>Your Android app receives this URL and can extract the slug "<strong>{slug}</strong>" to show the right category.</small>
	</div>
{:else}
	<div class="not-found card">
		<h1>Category Not Found</h1>
		<p>No category "<code>{slug}</code>". Try <a href="/categories">browsing all categories</a>.</p>
	</div>
{/if}

<style>
	.breadcrumb {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 28px;
	}

	.icon {
		font-size: 3rem;
	}

	h1 {
		font-size: 1.8rem;
		margin-bottom: 4px;
	}

	.header p {
		color: var(--text-muted);
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
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
		margin-bottom: 4px;
	}

	.price {
		color: var(--green);
		font-weight: 600;
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
	}
</style>
