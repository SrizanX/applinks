<script lang="ts">
  import { page } from "$app/state";
  const origin = $derived(page.url.origin);

  const scenarios = [
    {
      code: "product1",
      status: "302",
      label: "Temporary Redirect",
      badge: "badge-blue",
      destination: "/products/1",
      hops: 1,
      description:
        "Single 302 redirect. The most common type — URL shorteners, push notification links.",
      advice:
        "OkHttp follows redirects automatically. Ensure your final destination URL is parsed, not the /r/... URL.",
    },
    {
      code: "old-deals",
      status: "301",
      label: "Permanent Redirect",
      badge: "badge-green",
      destination: "/deals",
      hops: 1,
      description:
        "301 redirect simulating a route that was renamed. Clients may cache this permanently.",
      advice:
        "Permanent redirects can be cached by Android WebView. Use 302 for links you may want to change.",
    },
    {
      code: "chain",
      status: "302 → 302",
      label: "2-Hop Chain",
      badge: "badge-orange",
      destination: "/products/1",
      hops: 2,
      description:
        "/r/chain → /r/product1 → /products/1. Common with link-shortener-inside-a-shortener patterns.",
      advice:
        "OkHttp follows up to 20 redirects. HttpURLConnection follows 5. Set max redirects or use OkHttp for deep link resolution.",
    },
    {
      code: "triple",
      status: "302 × 3",
      label: "3-Hop Chain",
      badge: "badge-orange",
      destination: "/products/1",
      hops: 3,
      description:
        "/r/triple → /r/chain → /r/product1 → /products/1. Tests multi-hop redirect chains.",
      advice:
        "Log the full redirect chain in debug builds to diagnose link resolution issues.",
    },
    {
      code: "loop1",
      status: "302 ∞",
      label: "Redirect Loop",
      badge: "badge-red",
      destination: "/r/loop2 → /r/loop1 → ...",
      hops: -1,
      description:
        "/r/loop1 ↔ /r/loop2 forever. Tests that your HTTP client bails out after hitting max redirects.",
      advice:
        "OkHttp throws a ProtocolException after 20 redirects. Catch it and show an error UI — never let it crash the app.",
    },
    {
      code: "summer2023",
      status: "410",
      label: "Gone (410)",
      badge: "badge-red",
      destination: null,
      hops: 0,
      description:
        "410 Gone — resource permanently removed. No redirect target exists.",
      advice:
        "Treat 410 like 404 but do NOT retry. Inform the user the content is gone and navigate to a fallback.",
    },
  ];
</script>

<svelte:head>
  <title>Redirect Test Suite — ShopLink</title>
</svelte:head>

<h1>Redirect Chain Test Suite</h1>
<p class="subtitle">
  All redirect URLs live under <code>/r/[code]</code>. Use these with
  <code>adb shell am start</code>
  to verify your app handles each redirect type correctly.
</p>

<div class="scenario-list">
  {#each scenarios as s}
    <div class="scenario card">
      <div class="scenario-header">
        <div class="left">
          <a href="/r/{s.code}"><code class="path">/r/{s.code}</code></a>
          {#if s.destination && s.hops > 0}
            <span class="arrow">→</span>
            <code class="dest">{s.destination}</code>
            {#if s.hops > 1}
              <span class="hops">({s.hops} hops)</span>
            {/if}
          {:else if s.hops === -1}
            <span class="arrow">→</span>
            <code class="dest loop">{s.destination}</code>
          {/if}
        </div>
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
            android.intent.category.BROWSABLE -d "{origin}/r/{s.code}"</code
          >
        </div>
      </div>
    </div>
  {/each}
</div>

<div class="note card" style="margin-top: 24px">
  <strong>How Android handles redirects:</strong>
  <ul>
    <li>
      <strong>App Links verification</strong> — only the final destination URL
      is matched against your intent filter. If <code>/r/chain</code> ultimately
      lands on <code>/products/1</code>, your app opens if you handle
      <code>/products/.*</code>.
    </li>
    <li>
      <strong>OkHttp</strong> — follows up to 20 redirects by default, then
      throws <code>ProtocolException</code>.
    </li>
    <li>
      <strong>HttpURLConnection</strong> — follows up to 5 redirects, then stops
      (no exception).
    </li>
    <li>
      <strong>WebView</strong> — follows redirects automatically but may cache 301s
      permanently.
    </li>
  </ul>
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

  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .path {
    font-size: 0.95rem;
    color: var(--accent);
  }
  .arrow {
    color: var(--text-muted);
  }
  .dest {
    font-size: 0.85rem;
    color: var(--green);
  }
  .dest.loop {
    color: var(--red);
  }
  .hops {
    font-size: 0.78rem;
    color: var(--text-muted);
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

  .note {
    font-size: 0.85rem;
  }

  .note strong {
    display: block;
    margin-bottom: 10px;
  }

  .note ul {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: var(--text-muted);
  }
</style>
