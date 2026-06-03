<script lang="ts">
  import { page } from "$app/state";

  const tips: Record<number, string> = {
    403: "User lacks permission. Save the deep link URI, redirect to login, then resume after successful auth.",
    404: "Resource not found. Check the URL segments are correct and the content still exists. Show a fallback UI.",
    410: "Resource permanently removed — do NOT retry. Show the user a helpful message and navigate to a fallback screen.",
    500: "Server-side failure. Show a retry button. Never display raw error messages to users.",
  };
</script>

<svelte:head>
  <title>Error {page.status} — ShopLink</title>
</svelte:head>

<div class="error-page">
  <div
    class="status-code"
    class:red={page.status >= 500}
    class:orange={page.status === 404 || page.status === 410}
    class:yellow={page.status === 403}
  >
    {page.status}
  </div>

  <h1>
    {#if page.status === 404}Not Found
    {:else if page.status === 403}Access Forbidden
    {:else if page.status === 410}Link Permanently Removed
    {:else if page.status === 500}Internal Server Error
    {:else}Something Went Wrong
    {/if}
  </h1>

  <p class="message">
    {page.error?.message ?? "An unexpected error occurred."}
  </p>

  <div class="route-info card">
    <div class="info-row">
      <strong>HTTP Status:</strong> <code>{page.status}</code>
    </div>
    <div class="info-row">
      <strong>URL:</strong> <code>{page.url.pathname}</code>
    </div>
    {#if tips[page.status]}
      <div class="tip">
        <span class="tip-label">Android advice:</span>
        {tips[page.status]}
      </div>
    {/if}
  </div>

  <div class="actions">
    <a href="/" class="btn btn-outline">← Home</a>
    <a href="/errors" class="btn btn-outline">Error Test Suite</a>
  </div>
</div>

<style>
  .error-page {
    max-width: 540px;
    margin: 60px auto;
    text-align: center;
  }

  .status-code {
    font-size: 6rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
    color: var(--text-muted);
  }

  .status-code.red {
    color: var(--red);
  }
  .status-code.orange {
    color: var(--orange);
  }
  .status-code.yellow {
    color: var(--yellow);
  }

  h1 {
    font-size: 1.6rem;
    margin-bottom: 8px;
  }

  .message {
    color: var(--text-muted);
    margin-bottom: 24px;
  }

  .route-info {
    text-align: left;
    margin-bottom: 24px;
    font-size: 0.85rem;
  }

  .info-row {
    margin-bottom: 6px;
  }

  .tip {
    margin-top: 12px;
    padding: 10px 12px;
    background: var(--bg);
    border-radius: var(--radius);
    border-left: 3px solid var(--accent);
    font-size: 0.82rem;
    color: var(--text-muted);
    text-align: left;
  }

  .tip-label {
    font-weight: 600;
    color: var(--accent);
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
    cursor: pointer;
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
