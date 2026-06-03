<script lang="ts">
	import { page } from '$app/state';

	let packageName = $state('com.example.shoplink');
	let sha256 = $state('');
	let ngrokDomain = $state('');

	let activeTab = $state<'assetlinks' | 'manifest' | 'testing'>('assetlinks');

	let assetlinksUrl = $derived(
		`${page.url.origin}/.well-known/assetlinks.json?package=${encodeURIComponent(packageName)}&sha256=${encodeURIComponent(sha256)}`
	);

	let assetlinksPreview = $derived(JSON.stringify([{
		relation: ['delegate_permission/common.handle_all_urls'],
		target: {
			namespace: 'android_app',
			package_name: packageName,
			sha256_cert_fingerprints: [sha256 || 'YOUR_SHA256_FINGERPRINT_HERE']
		}
	}], null, 2));

	function getManifestXml() {
		const domain = ngrokDomain || 'YOUR_NGROK_DOMAIN.ngrok-free.app';
		return `<activity
    android:name=".MainActivity"
    android:exported="true">

    <!-- App Link intent filter -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data android:scheme="https" />
        <data android:host="${domain}" />

        <!-- Handle all routes -->
        <data android:pathPrefix="/products" />
        <data android:pathPrefix="/categories" />
        <data android:pathPrefix="/profile" />
        <data android:pathPrefix="/deals" />
        <data android:pathPrefix="/share" />
    </intent-filter>

</activity>`;
	}

	function getKotlinCode() {
		return `override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    handleIntent(intent)
}

override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleIntent(intent)
}

private fun handleIntent(intent: Intent) {
    if (intent.action != Intent.ACTION_VIEW) return
    val uri = intent.data ?: return

    val path = uri.path ?: ""
    val segments = uri.pathSegments

    when {
        path.startsWith("/products/") && segments.size >= 2 -> {
            val productId = segments[1]
            // Navigate to product detail screen
            Log.d("AppLink", "Open product: $productId")
        }
        path.startsWith("/categories/") && segments.size >= 2 -> {
            val category = segments[1]
            // Navigate to category screen
            Log.d("AppLink", "Open category: $category")
        }
        path.startsWith("/profile/") && segments.size >= 2 -> {
            val username = segments[1]
            // Navigate to profile screen
            Log.d("AppLink", "Open profile: $username")
        }
        path.startsWith("/deals") -> {
            // Navigate to deals screen
            Log.d("AppLink", "Open deals")
        }
        path.startsWith("/share/") && segments.size >= 2 -> {
            val code = segments[1]
            // Resolve share code and navigate
            Log.d("AppLink", "Open share: $code")
        }
        else -> {
            // Default: open home screen
            Log.d("AppLink", "Open home")
        }
    }
}`;
	}

	function getTestCommands() {
		const domain = ngrokDomain || 'YOUR_NGROK_DOMAIN.ngrok-free.app';
		return `# 1. Get your SHA-256 fingerprint
./gradlew signingReport

# 2. Start ngrok (in a separate terminal)
ngrok http 5173

# 3. Install your app
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 4. Verify app links (Android 12+)
adb shell pm verify-app-links --re-verify --package ${packageName}

# 5. Check verification status
adb shell pm get-app-links --package ${packageName}

# 6. Test links from emulator
adb shell am start -a android.intent.action.VIEW \\
    -c android.intent.category.BROWSABLE \\
    -d "https://${domain}/products/1"

adb shell am start -a android.intent.action.VIEW \\
    -c android.intent.category.BROWSABLE \\
    -d "https://${domain}/categories/electronics"

adb shell am start -a android.intent.action.VIEW \\
    -c android.intent.category.BROWSABLE \\
    -d "https://${domain}/profile/johndoe"

adb shell am start -a android.intent.action.VIEW \\
    -c android.intent.category.BROWSABLE \\
    -d "https://${domain}/deals"

adb shell am start -a android.intent.action.VIEW \\
    -c android.intent.category.BROWSABLE \\
    -d "https://${domain}/share/SUMMER2024"`;
	}

	let copied = $state('');

	function copyText(text: string, label: string) {
		navigator.clipboard.writeText(text);
		copied = label;
		setTimeout(() => copied = '', 2000);
	}
</script>

<svelte:head>
	<title>App Links Setup — ShopLink</title>
</svelte:head>

<h1>⚙️ App Links Setup</h1>
<p class="subtitle">Configure this web app to work with your Android app. Follow the steps below.</p>

<div class="config card">
	<h2>Your Configuration</h2>
	<div class="form-row">
		<div class="form-group">
			<label for="package">Android Package Name</label>
			<input id="package" type="text" bind:value={packageName} placeholder="com.example.shoplink" />
		</div>
		<div class="form-group">
			<label for="sha256">SHA-256 Fingerprint</label>
			<input id="sha256" type="text" bind:value={sha256} placeholder="14:6D:E9:83:C5:..." />
			<small>Run <code>./gradlew signingReport</code> to get this</small>
		</div>
	</div>
	<div class="form-group" style="margin-top: 12px">
		<label for="ngrok">ngrok Domain (after running ngrok)</label>
		<input id="ngrok" type="text" bind:value={ngrokDomain} placeholder="abcd1234.ngrok-free.app" />
		<small>Run <code>ngrok http 5173</code> and paste the domain here</small>
	</div>
</div>

<div class="tabs">
	<button class:active={activeTab === 'assetlinks'} onclick={() => activeTab = 'assetlinks'}>1. assetlinks.json</button>
	<button class:active={activeTab === 'manifest'} onclick={() => activeTab = 'manifest'}>2. AndroidManifest.xml</button>
	<button class:active={activeTab === 'testing'} onclick={() => activeTab = 'testing'}>3. Testing</button>
</div>

{#if activeTab === 'assetlinks'}
	<div class="card">
		<h3>assetlinks.json — Already Served!</h3>
		<p class="info">This app already serves <code>assetlinks.json</code> at the correct path. It uses your package name and SHA-256 from above.</p>

		<div class="url-box">
			<strong>Live URL:</strong>
			<a href={assetlinksUrl} target="_blank">{assetlinksUrl}</a>
		</div>

		<p class="info" style="margin-top: 16px">When you run ngrok, your assetlinks.json will be available at:</p>
		<div class="url-box">
			<code>https://{ngrokDomain || 'YOUR_DOMAIN'}/.well-known/assetlinks.json?package={packageName}&sha256={sha256 || 'YOUR_SHA256'}</code>
		</div>

		<h4 style="margin-top: 20px">Preview:</h4>
		<div class="code-block">
			<button class="copy-btn" onclick={() => copyText(assetlinksPreview, 'assetlinks')}>
				{copied === 'assetlinks' ? '✓ Copied' : '📋 Copy'}
			</button>
			<pre><code>{assetlinksPreview}</code></pre>
		</div>

		<div class="note">
			<strong>⚠️ Note:</strong> The assetlinks.json is served dynamically using query params for easy testing. In production, you'd host a static file. Ngrok provides HTTPS automatically, which is required for App Links verification.
		</div>
	</div>
{:else if activeTab === 'manifest'}
	<div class="card">
		<h3>AndroidManifest.xml — Intent Filters</h3>
		<p class="info">Add this to your Android app's <code>AndroidManifest.xml</code>:</p>

		<div class="code-block">
			<button class="copy-btn" onclick={() => copyText(getManifestXml(), 'manifest')}>
				{copied === 'manifest' ? '✓ Copied' : '📋 Copy'}
			</button>
			<pre><code>{getManifestXml()}</code></pre>
		</div>

		<h4 style="margin-top: 24px">Handling the Intent (Kotlin):</h4>
		<div class="code-block">
			<button class="copy-btn" onclick={() => copyText(getKotlinCode(), 'kotlin')}>
				{copied === 'kotlin' ? '✓ Copied' : '📋 Copy'}
			</button>
			<pre><code>{getKotlinCode()}</code></pre>
		</div>

		<div class="routes-table">
			<h4>Routes Your App Should Handle</h4>
			<table>
				<thead>
					<tr><th>URL Path</th><th>What to show</th><th>Parameters</th></tr>
				</thead>
				<tbody>
					<tr><td><code>/products/[id]</code></td><td>Product detail</td><td>id: number</td></tr>
					<tr><td><code>/categories/[slug]</code></td><td>Category listing</td><td>slug: string</td></tr>
					<tr><td><code>/profile/[username]</code></td><td>User profile</td><td>username: string</td></tr>
					<tr><td><code>/deals</code></td><td>Deals page</td><td>none</td></tr>
					<tr><td><code>/share/[code]</code></td><td>Share handler</td><td>code: string</td></tr>
				</tbody>
			</table>
		</div>
	</div>
{:else}
	<div class="card">
		<h3>Testing Commands</h3>
		<p class="info">Run these commands to test your App Links setup:</p>

		<div class="code-block">
			<button class="copy-btn" onclick={() => copyText(getTestCommands(), 'test')}>
				{copied === 'test' ? '✓ Copied' : '📋 Copy'}
			</button>
			<pre><code>{getTestCommands()}</code></pre>
		</div>

		<h4 style="margin-top: 24px">Step-by-Step</h4>
		<ol class="steps">
			<li>
				<strong>Start this web app</strong>
				<p>Run <code>npm run dev</code> (already running if you see this page)</p>
			</li>
			<li>
				<strong>Start ngrok</strong>
				<p>Run <code>ngrok http 5173</code> in another terminal. Copy the <code>*.ngrok-free.app</code> domain and paste it above.</p>
			</li>
			<li>
				<strong>Update your Android app</strong>
				<p>Put the ngrok domain in your <code>AndroidManifest.xml</code> intent filter and rebuild.</p>
			</li>
			<li>
				<strong>Install the app on emulator</strong>
				<p>Build and install your app. Android will automatically fetch <code>assetlinks.json</code> during install.</p>
			</li>
			<li>
				<strong>Verify</strong>
				<p>Run <code>adb shell pm get-app-links --package {packageName}</code> — look for <strong>"verified"</strong> status.</p>
			</li>
			<li>
				<strong>Test!</strong>
				<p>Open the emulator's Chrome browser, navigate to <code>https://{ngrokDomain || 'YOUR_DOMAIN'}/products/1</code> — it should open in your app, not the browser!</p>
			</li>
		</ol>

		<div class="note">
			<strong>💡 Tip:</strong> If verification fails, run <code>adb shell pm set-app-links --package {packageName} 0 all</code> to reset, then <code>adb shell pm verify-app-links --re-verify --package {packageName}</code> to retry.
		</div>
	</div>
{/if}

<style>
	h1 {
		font-size: 1.8rem;
		margin-bottom: 8px;
	}

	.subtitle {
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.config {
		margin-bottom: 24px;
	}

	.config h2 {
		font-size: 1.1rem;
		margin-bottom: 16px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group small {
		margin-top: 4px;
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.tabs {
		display: flex;
		gap: 4px;
		margin-bottom: 16px;
	}

	.tabs button {
		padding: 10px 20px;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius) var(--radius) 0 0;
		color: var(--text-muted);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.tabs button.active {
		background: var(--bg-card);
		color: var(--accent);
		border-bottom-color: var(--bg-card);
	}

	.tabs button:hover {
		color: var(--text-heading);
	}

	.card h3 {
		font-size: 1.1rem;
		margin-bottom: 8px;
	}

	.info {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: 12px;
	}

	.url-box {
		background: var(--bg);
		padding: 12px;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		font-size: 0.8rem;
		word-break: break-all;
	}

	.code-block {
		position: relative;
	}

	.copy-btn {
		position: absolute;
		top: 8px;
		right: 8px;
		background: var(--bg-card);
		border: 1px solid var(--border);
		color: var(--text-muted);
		padding: 4px 10px;
		border-radius: 4px;
		font-size: 0.75rem;
		z-index: 1;
	}

	.copy-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.note {
		background: rgba(251, 191, 36, 0.1);
		border: 1px solid rgba(251, 191, 36, 0.3);
		border-radius: var(--radius);
		padding: 12px 16px;
		margin-top: 16px;
		font-size: 0.85rem;
		color: var(--yellow);
	}

	.routes-table {
		margin-top: 24px;
	}

	.routes-table h4 {
		margin-bottom: 12px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		text-align: left;
		padding: 10px 14px;
		border-bottom: 1px solid var(--border);
		font-size: 0.85rem;
	}

	th {
		color: var(--text-muted);
		font-weight: 600;
		font-size: 0.8rem;
		text-transform: uppercase;
	}

	.steps {
		padding-left: 20px;
	}

	.steps li {
		padding: 10px 0;
		border-bottom: 1px solid var(--border);
	}

	.steps li:last-child {
		border-bottom: none;
	}

	.steps strong {
		font-size: 0.95rem;
	}

	.steps p {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 4px;
	}

	h4 {
		font-size: 0.95rem;
		margin-bottom: 8px;
	}

	@media (max-width: 700px) {
		.form-row {
			grid-template-columns: 1fr;
		}

		.tabs {
			flex-direction: column;
		}
	}
</style>
