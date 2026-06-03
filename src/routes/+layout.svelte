<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>ShopLink Demo</title>
  <meta
    name="description"
    content="Sample web app for testing Android App Links"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app">
  <nav>
    <a href="/" class="logo">🛒 ShopLink</a>
    <div class="nav-links">
      <a href="/products">Products</a>
      <a href="/categories">Categories</a>
      <a href="/deals">Deals</a>
      <a href="/orders">Orders</a>
      <a href="/profile/johndoe">Profile</a>
      <a href="/errors" class="test-link">🧪 Errors</a>
      <a href="/redirects" class="test-link">↪ Redirects</a>
      <a href="/setup" class="setup-link">⚙️ Setup</a>
    </div>
  </nav>
  <main>
    {@render children()}
  </main>
  <footer>
    <p>ShopLink Demo — A sample web app for learning Android App Links</p>
    <p class="footer-routes">
      Routes: <code>/products/[id]</code> · <code>/categories/[slug]</code> ·
      <code>/profile/[username]</code>
      · <code>/deals</code> · <code>/orders</code> · <code>/share/[code]</code>
      · <code>/errors/*</code> · <code>/redirects</code> ·
      <code>/r/[code]</code>
    </p>
  </footer>
</div>

<style>
  @import "$lib/styles/global.css";

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  nav {
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    padding: 0 24px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .logo {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-heading);
  }

  .logo:hover {
    color: var(--accent);
  }

  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .nav-links a {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .nav-links a:hover {
    color: var(--text-heading);
  }

  .setup-link,
  .test-link {
    background: var(--bg);
    padding: 6px 12px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }

  .setup-link:hover,
  .test-link:hover {
    border-color: var(--accent) !important;
    color: var(--accent) !important;
  }

  .test-link {
    border-color: rgba(251, 146, 60, 0.3);
    color: var(--orange) !important;
  }

  main {
    flex: 1;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding: 32px 24px;
  }

  footer {
    background: var(--bg-card);
    border-top: 1px solid var(--border);
    padding: 20px 24px;
    text-align: center;
  }

  footer p {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .footer-routes {
    margin-top: 6px;
  }

  @media (max-width: 700px) {
    .nav-links {
      gap: 12px;
    }

    nav {
      flex-wrap: wrap;
      height: auto;
      padding: 12px 16px;
      gap: 8px;
    }
  }
</style>
