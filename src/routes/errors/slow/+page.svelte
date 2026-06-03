<script lang="ts">
  import { page } from "$app/state";
  let { data } = $props();
</script>

<svelte:head>
  <title>Slow Response — ShopLink</title>
</svelte:head>

<div class="slow-page">
  <div class="icon">🐢</div>
  <h1>Slow Response — Success</h1>
  <p class="subtitle">
    This page took <strong>{data.elapsed}ms</strong> to respond. HTTP status:
    <code>200 OK</code>
  </p>

  <div class="route-info card">
    <div><strong>Route:</strong> <code>/errors/slow</code></div>
    <div><strong>Full URL:</strong> <code>{page.url.href}</code></div>
    <div><strong>Server delay:</strong> <code>{data.elapsed}ms</code></div>
    <br />
    <small>
      The server intentionally delayed this response by ~4 seconds. Your Android
      app should:
      <ul class="tips">
        <li>
          Show a loading/progress indicator while the deep linked screen loads
        </li>
        <li>
          Set a reasonable HTTP timeout (e.g. 10–15 seconds) and handle <code
            >SocketTimeoutException</code
          >
        </li>
        <li>Avoid blocking the main thread while waiting for content</li>
      </ul>
    </small>
  </div>

  <a href="/errors" class="btn btn-outline">← Back to Error Tests</a>
</div>

<style>
  .slow-page {
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

  .tips {
    margin-top: 8px;
    padding-left: 20px;
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    gap: 4px;
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
  }

  .btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
