<script lang="ts">
  import { page } from "$app/state";

  // Simulate authentication via ?auth=1 query param.
  // In a real app the auth state would come from a token/session.
  // This lets you test both the login wall and the authenticated view with a single ADB command.
  const isAuthenticated = $derived(page.url.searchParams.get("auth") === "1");
  const origin = $derived(page.url.origin);

  const orders = [
    {
      id: "ORD-1042",
      date: "May 10, 2026",
      status: "Delivered",
      items: ["Wireless Headphones", "USB-C Hub"],
      total: 114.98,
    },
    {
      id: "ORD-1031",
      date: "Apr 28, 2026",
      status: "In Transit",
      items: ["Smart Watch"],
      total: 199.99,
    },
    {
      id: "ORD-1018",
      date: "Apr 12, 2026",
      status: "Delivered",
      items: ["Laptop Stand", "Mechanical Keyboard"],
      total: 179.98,
    },
  ];

  const statusColor: Record<string, string> = {
    Delivered: "badge-green",
    "In Transit": "badge-blue",
    Processing: "badge-orange",
  };
</script>

<svelte:head>
  <title>{isAuthenticated ? "My Orders" : "Sign In Required"} — ShopLink</title>
</svelte:head>

{#if isAuthenticated}
  <!-- ── Authenticated view ── -->
  <div class="orders-header">
    <h1>My Orders</h1>
    <p class="subtitle">
      Logged in as <code>demo_user</code> (simulated via <code>?auth=1</code>)
    </p>
  </div>

  <div class="order-list">
    {#each orders as order}
      <div class="order card">
        <div class="order-header">
          <div>
            <code class="order-id">{order.id}</code>
            <span class="order-date">{order.date}</span>
          </div>
          <span class="badge {statusColor[order.status] ?? 'badge-blue'}"
            >{order.status}</span
          >
        </div>
        <div class="order-items">
          {#each order.items as item}
            <span class="item-tag">{item}</span>
          {/each}
        </div>
        <div class="order-footer">
          <strong>${order.total.toFixed(2)}</strong>
        </div>
      </div>
    {/each}
  </div>

  <div class="route-info card">
    <strong>Route:</strong> <code>/orders?auth=1</code><br />
    <strong>Full URL:</strong> <code>{page.url.href}</code><br />
    <br />
    <small>
      In a real app, auth state comes from a stored token — not a query param.
      This simulates the
      <em>post-login</em> state to let you verify the deep link destination renders
      correctly after the user has been authenticated.
    </small>
  </div>
{:else}
  <!-- ── Unauthenticated / login wall ── -->
  <div class="login-wall">
    <div class="lock-icon">🔒</div>
    <h1>Sign In Required</h1>
    <p class="subtitle">
      You need to be logged in to view your orders.<br />
      This is an <strong>auth-gated deep link</strong>.
    </p>

    <a
      href="/orders?auth=1"
      class="btn btn-primary"
      style="display:inline-block; margin-bottom: 24px"
    >
      Simulate Login & View Orders →
    </a>

    <div class="route-info card">
      <strong>Route:</strong> <code>/orders</code> (no auth)<br />
      <strong>Full URL:</strong> <code>{page.url.href}</code><br />
      <br />
      <strong class="section-title">The Android deep link auth flow:</strong>
      <ol class="steps">
        <li>
          User taps a link to <code>/orders</code> (e.g. from a push notification)
        </li>
        <li>Your app opens and detects the user is not logged in</li>
        <li>
          App <strong>saves</strong> the original deep link URI (<code
            >intent.data</code
          >)
        </li>
        <li>App navigates to the login screen</li>
        <li>
          After successful login, app retrieves the saved URI and navigates
          there
        </li>
      </ol>
      <br />
      <strong>ADB test — unauthenticated:</strong>
      <div class="adb-cmd">
        <code
          >adb shell am start -a android.intent.action.VIEW -c
          android.intent.category.BROWSABLE -d "{origin}/orders"</code
        >
      </div>
      <br />
      <strong>ADB test — authenticated (post-login):</strong>
      <div class="adb-cmd">
        <code
          >adb shell am start -a android.intent.action.VIEW -c
          android.intent.category.BROWSABLE -d "{origin}/orders?auth=1"</code
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .orders-header {
    margin-bottom: 24px;
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 6px;
  }
  .subtitle {
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .order {
    padding: 18px 20px;
  }

  .order-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .order-id {
    font-size: 0.95rem;
    margin-right: 10px;
  }

  .order-date {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .order-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }

  .item-tag {
    font-size: 0.78rem;
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 2px 8px;
    border-radius: 20px;
    color: var(--text-muted);
  }

  .order-footer {
    font-size: 0.95rem;
    color: var(--green);
  }

  /* Login wall */
  .login-wall {
    max-width: 580px;
    margin: 0 auto;
    text-align: center;
  }

  .lock-icon {
    font-size: 4rem;
    margin-bottom: 12px;
  }

  .route-info {
    text-align: left;
    font-size: 0.84rem;
    margin-top: 0;
  }

  .section-title {
    display: block;
    margin-bottom: 8px;
    color: var(--text-heading);
  }

  .steps {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--text-muted);
  }

  .adb-cmd {
    background: var(--bg-code);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 8px 12px;
    overflow-x: auto;
    margin-top: 6px;
  }

  .adb-cmd code {
    background: none;
    font-size: 0.76rem;
    white-space: nowrap;
    color: var(--green);
  }

  .btn {
    padding: 10px 24px;
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
    border-color: var(--accent-hover);
  }
</style>
