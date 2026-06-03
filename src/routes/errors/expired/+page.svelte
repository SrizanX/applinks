<script lang="ts">
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>Link Expired — ShopLink</title>
</svelte:head>

<div class="expired-page">
  <div class="icon">⏰</div>
  <h1>This Link Has Expired</h1>
  <p class="subtitle">
    The promotion or content at this URL is no longer available. HTTP status: <code
      >200 OK</code
    >
  </p>

  <div class="route-info card">
    <div><strong>Route:</strong> <code>/errors/expired</code></div>
    <div><strong>Full URL:</strong> <code>{page.url.href}</code></div>
    <div>
      <strong>HTTP Status:</strong> <code>200 OK</code> — but content is logically
      expired
    </div>
    <br />
    <small>
      This is a <strong>logic-level expiry</strong>, not an HTTP error. The
      server returns 200 OK but the response body indicates the content is no
      longer valid. This is common with:
      <ul class="examples">
        <li>Time-limited promotions (e.g. flash sales)</li>
        <li>One-time-use invite links</li>
        <li>Deep links to content that was deleted by the user</li>
      </ul>
      <br />
      Your Android app must <strong>parse the response body</strong>, not just
      check the HTTP status code. A 200 does not guarantee usable content.
    </small>
  </div>

  <div class="actions">
    <a href="/deals" class="btn btn-primary">View Current Deals</a>
    <a href="/errors" class="btn btn-outline">← Error Tests</a>
  </div>
</div>

<style>
  .expired-page {
    max-width: 560px;
    margin: 0 auto;
    text-align: center;
  }

  .icon {
    font-size: 4rem;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--text-muted);
    margin-bottom: 24px;
  }

  .route-info {
    text-align: left;
    margin-bottom: 20px;
    font-size: 0.85rem;
  }

  .route-info > div {
    margin-bottom: 6px;
  }

  .examples {
    margin-top: 8px;
    padding-left: 20px;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .btn {
    display: inline-block;
    padding: 8px 20px;
    border-radius: var(--radius);
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--border);
    color: var(--text);
    background: var(--bg-card);
    transition: all 0.15s;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--accent);
    color: var(--bg);
    border-color: var(--accent);
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    color: var(--bg);
    border-color: var(--accent-hover);
  }

  .btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
