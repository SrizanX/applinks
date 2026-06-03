<script lang="ts">
	const categories = [
		{ slug: 'electronics', name: 'Electronics', icon: '📱', count: 3, description: 'Smart devices and gadgets' },
		{ slug: 'accessories', name: 'Accessories', icon: '🎒', count: 3, description: 'Peripherals and add-ons' },
		{ slug: 'audio', name: 'Audio', icon: '🔊', count: 2, description: 'Speakers, headphones, and more' },
		{ slug: 'wearables', name: 'Wearables', icon: '⌚', count: 1, description: 'Smartwatches and fitness bands' },
		{ slug: 'home', name: 'Home & Office', icon: '🏠', count: 4, description: 'Productivity and home tech' },
	];
</script>

<h1>Categories</h1>
<p class="subtitle">Browse by category. Each has its own route: <code>/categories/[slug]</code></p>

<div class="category-grid">
	{#each categories as cat}
		<a href="/categories/{cat.slug}" class="card category-card">
			<div class="cat-icon">{cat.icon}</div>
			<div class="cat-info">
				<h3>{cat.name}</h3>
				<p>{cat.description}</p>
				<span class="count">{cat.count} products</span>
			</div>
			<span class="route">/categories/{cat.slug}</span>
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

	.category-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
	}

	.category-card {
		display: flex;
		align-items: center;
		gap: 16px;
		transition: all 0.2s;
		position: relative;
	}

	.category-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
	}

	.cat-icon {
		font-size: 2.5rem;
		flex-shrink: 0;
	}

	.cat-info h3 {
		font-size: 1rem;
		margin-bottom: 4px;
	}

	.cat-info p {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.count {
		font-size: 0.75rem;
		color: var(--accent);
		font-weight: 600;
	}

	.route {
		position: absolute;
		bottom: 8px;
		right: 12px;
		font-size: 0.65rem;
		font-family: monospace;
		color: var(--text-muted);
		background: var(--bg);
		padding: 2px 6px;
		border-radius: 4px;
	}
</style>
