<script lang="ts">
  const featuredProducts = [
    { id: 1, name: "Wireless Headphones", price: 79.99, image: "🎧" },
    { id: 2, name: "Smart Watch", price: 199.99, image: "⌚" },
    { id: 3, name: "Laptop Stand", price: 49.99, image: "💻" },
    { id: 4, name: "USB-C Hub", price: 34.99, image: "🔌" },
  ];

  const categories = [
    { slug: "electronics", name: "Electronics", icon: "📱", count: 42 },
    { slug: "accessories", name: "Accessories", icon: "🎒", count: 28 },
    { slug: "audio", name: "Audio", icon: "🔊", count: 15 },
  ];
</script>

<div class="hero">
  <h1>Welcome to ShopLink</h1>
  <p>
    A sample store for testing Android App Links. Run this with <code
      >ngrok</code
    > and point your Android app here.
  </p>
  <div class="hero-links">
    <a href="/setup" class="btn btn-primary">⚙️ Setup App Links</a>
    <a href="/products" class="btn btn-outline">Browse Products</a>
  </div>
</div>

<section>
  <div class="section-header">
    <h2>Featured Products</h2>
    <a href="/products">View all →</a>
  </div>
  <div class="product-grid">
    {#each featuredProducts as product}
      <a href="/products/{product.id}" class="card product-card">
        <div class="product-image">{product.image}</div>
        <h3>{product.name}</h3>
        <p class="price">${product.price}</p>
        <span class="route-badge">/products/{product.id}</span>
      </a>
    {/each}
  </div>
</section>

<section>
  <div class="section-header">
    <h2>Categories</h2>
    <a href="/categories">View all →</a>
  </div>
  <div class="category-grid">
    {#each categories as cat}
      <a href="/categories/{cat.slug}" class="card category-card">
        <span class="cat-icon">{cat.icon}</span>
        <div>
          <h3>{cat.name}</h3>
          <p>{cat.count} items</p>
        </div>
        <span class="route-badge">/categories/{cat.slug}</span>
      </a>
    {/each}
  </div>
</section>

<section>
  <div class="section-header">
    <h2>Quick Links to Test</h2>
  </div>
  <div class="test-links card">
    <p>Copy these paths to test in your Android emulator:</p>
    <div class="link-list">
      <a href="/products/1"><code>/products/1</code> — Product detail page</a>
      <a href="/products/2"><code>/products/2</code> — Another product</a>
      <a href="/categories/electronics"
        ><code>/categories/electronics</code> — Category page</a
      >
      <a href="/profile/johndoe"><code>/profile/johndoe</code> — User profile</a
      >
      <a href="/deals"><code>/deals</code> — Deals page</a>
      <a href="/share/SUMMER2024"
        ><code>/share/SUMMER2024</code> — Shareable link</a
      >
      <a href="/orders"><code>/orders</code> — Auth-gated route (login wall)</a>
      <a href="/orders?auth=1"
        ><code>/orders?auth=1</code> — Auth-gated route (authenticated)</a
      >
      <a href="/errors"
        ><code>/errors</code> — Error scenario suite (404, 403, 500, slow, expired)</a
      >
      <a href="/redirects"
        ><code>/redirects</code> — Redirect chain suite (302, 301, loop, gone)</a
      >
    </div>
  </div>
</section>

<style>
  .hero {
    text-align: center;
    padding: 40px 0;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--border);
  }

  .hero h1 {
    font-size: 2.2rem;
    margin-bottom: 12px;
  }

  .hero p {
    color: var(--text-muted);
    font-size: 1.05rem;
    margin-bottom: 24px;
  }

  .hero-links {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  section {
    margin-bottom: 40px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .section-header h2 {
    font-size: 1.3rem;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .product-card {
    display: block;
    text-align: center;
    transition: all 0.2s;
    position: relative;
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
    font-size: 1.1rem;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }

  .category-card {
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.2s;
    position: relative;
  }

  .category-card:hover {
    border-color: var(--accent);
  }

  .cat-icon {
    font-size: 2rem;
  }

  .category-card h3 {
    font-size: 0.95rem;
  }

  .category-card p {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .route-badge {
    display: block;
    margin-top: 10px;
    font-size: 0.7rem;
    color: var(--text-muted);
    background: var(--bg);
    padding: 2px 8px;
    border-radius: 4px;
    font-family: monospace;
  }

  .test-links p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .link-list a {
    display: block;
    padding: 10px 14px;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    font-size: 0.875rem;
    transition: border-color 0.2s;
  }

  .link-list a:hover {
    border-color: var(--accent);
  }
</style>
