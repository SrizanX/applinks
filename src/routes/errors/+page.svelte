<script lang="ts">
  import { page } from "$app/state";

  const origin = $derived(page.url.origin);

  const scenarios = [
    {
      path: "/errors/404",
      status: "404",
      label: "Not Found",
      badge: "badge-orange",
      description:
        "Server returns 404. Common for deleted products, invalid IDs, or stale links in notifications.",
      advice:
        'Check the HTTP status code before processing content. Show a friendly "Not found" UI with a path to recovery (e.g. link to /products).',
    },
    {
      path: "/errors/403",
      status: "403",
      label: "Forbidden",
      badge: "badge-red",
      description:
        "Server returns 403. Common for private profiles, order history, or auth-gated content.",
      advice:
        "Detect 403 → save the original deep link URI → redirect to login screen → after successful login, navigate to the saved URI.",
    },
    {
      path: "/errors/500",
      status: "500",
      label: "Server Error",
      badge: "badge-red",
      description:
        "Server returns 500. Temporary failure — could work on retry.",
      advice:
        "Show a retry button. Log the error silently. Never display raw stack traces to users.",
    },
    {
      path: "/errors/slow",
      status: "200",
      label: "Slow (4s delay)",
      badge: "badge-blue",
      description:
        "Server delays response by 4 seconds, then returns 200. Tests timeout handling and loading states.",
      advice:
        "Show a loading indicator from the moment the deep link fires. Set a timeout (10–15s) and handle SocketTimeoutException gracefully.",
    },
    {
      path: "/errors/expired",
      status: "200",
      label: "Expired Content",
      badge: "badge-orange",
      description:
        "HTTP 200 OK but the content signals the promo/link is expired. Logic error — not an HTTP error.",
      advice:
        "A 200 does not mean the content is usable. Parse the response body for expiry state and show appropriate UI.",
    },
  ];
</script>

<svelte:head>
  <title>Error Test Suite — ShopLink</title>
</svelte:head>

<h1>Error Scenario Test Suite</h1>
<p class="subtitle">
  These routes simulate real-world server failures. Use them with <code
    >adb shell am start</code
  > to test how your Android app handles each case.
</p>

<div class="scenario-list">
  {#each scenarios as s}
    <div class="scenario card">
      <div class="scenario-header">
        <a href={s.path}><code class="path">{s.path}</code></a>
        <span class="badge {s.badge}">{s.status} {s.label}</span>
      </div>
      <p class="desc">{s.description}</p>
      <div class="advice">
        <span class="advice-label">Android:</span>
        {s.advice}
      </div>
      <div class="adb-block">
        <span class="adb-label">ADB test command</span>
        <div class="adb-cmd">
          <code
            >adb shell am start -a android.intent.action.VIEW -c
            android.intent.category.BROWSABLE -d "{origin}{s.path}"</code
          >
        </div>
      </div>
    </div>
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
    font-size: 0.95rem;
  }

  .scenario-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .scenario {
    padding: 20px;
  }

  .scenario-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .path {
    font-size: 1rem;
    color: var(--accent);
  }

  .desc {
    color: var(--text-muted);
    font-size: 0.88rem;
    margin-bottom: 10px;
  }

  .advice {
    font-size: 0.83rem;
    padding: 8px 12px;
    background: var(--bg);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius);
    margin-bottom: 12px;
    color: var(--text-muted);
  }

  .advice-label {
    font-weight: 600;
    color: var(--accent);
    margin-right: 4px;
  }

  .adb-block {
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .adb-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--text-muted);
    padding: 6px 12px 4px;
    border-bottom: 1px solid var(--border);
  }

  .adb-cmd {
    padding: 8px 12px;
    overflow-x: auto;
  }

  .adb-cmd code {
    background: none;
    font-size: 0.78rem;
    white-space: nowrap;
    color: var(--green);
  }
</style>
