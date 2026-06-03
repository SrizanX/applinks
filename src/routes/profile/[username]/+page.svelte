<script lang="ts">
	import { page } from '$app/state';

	const users: Record<string, { name: string; bio: string; avatar: string; joined: string; orders: number; reviews: number }> = {
		johndoe: { name: 'John Doe', bio: 'Tech enthusiast and gadget collector.', avatar: '👨‍💻', joined: 'Jan 2023', orders: 24, reviews: 12 },
		janedoe: { name: 'Jane Doe', bio: 'Audio gear reviewer and music lover.', avatar: '👩‍🎤', joined: 'Mar 2023', orders: 18, reviews: 8 },
		techguru: { name: 'Tech Guru', bio: 'Professional tech reviewer with 10 years of experience.', avatar: '🧑‍🔬', joined: 'Dec 2022', orders: 45, reviews: 32 },
	};

	const username = $derived(page.params.username);
	const user = $derived(users[username]);
</script>

<svelte:head>
	<title>{user ? user.name : 'User Not Found'} — ShopLink</title>
</svelte:head>

{#if user}
	<div class="breadcrumb">
		<a href="/">Home</a> / Profile / {user.name}
	</div>

	<div class="profile-card card">
		<div class="avatar">{user.avatar}</div>
		<h1>{user.name}</h1>
		<p class="username">@{username}</p>
		<p class="bio">{user.bio}</p>

		<div class="stats">
			<div class="stat">
				<strong>{user.orders}</strong>
				<span>Orders</span>
			</div>
			<div class="stat">
				<strong>{user.reviews}</strong>
				<span>Reviews</span>
			</div>
			<div class="stat">
				<strong>{user.joined}</strong>
				<span>Joined</span>
			</div>
		</div>

		<button class="btn btn-outline" style="width: 100%">Follow</button>
	</div>

	<div class="route-info card">
		<strong>Route:</strong> <code>/profile/{username}</code><br />
		<strong>Full URL:</strong> <code>{page.url.href}</code><br />
		<small>Your Android app extracts username "<strong>{username}</strong>" from the URL path.</small>
	</div>

	<div class="other-users card" style="margin-top: 16px">
		<h3>Other Profiles to Test</h3>
		<div class="user-links">
			{#each Object.entries(users) as [uname, u]}
				{#if uname !== username}
					<a href="/profile/{uname}" class="user-link">
						<span>{u.avatar}</span>
						<span>{u.name}</span>
						<code>/profile/{uname}</code>
					</a>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div class="not-found card">
		<h1>User Not Found</h1>
		<p>No user "<code>{username}</code>". Try: <a href="/profile/johndoe">johndoe</a>, <a href="/profile/janedoe">janedoe</a>, or <a href="/profile/techguru">techguru</a></p>
	</div>
{/if}

<style>
	.breadcrumb {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.profile-card {
		text-align: center;
		padding: 40px;
		margin-bottom: 16px;
	}

	.avatar {
		font-size: 5rem;
		margin-bottom: 12px;
	}

	h1 {
		font-size: 1.6rem;
		margin-bottom: 4px;
	}

	.username {
		color: var(--accent);
		font-size: 0.9rem;
		margin-bottom: 8px;
	}

	.bio {
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.stats {
		display: flex;
		justify-content: center;
		gap: 40px;
		margin-bottom: 24px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.stat {
		text-align: center;
	}

	.stat strong {
		display: block;
		font-size: 1.2rem;
		color: var(--text-heading);
	}

	.stat span {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.route-info {
		padding: 14px;
		font-size: 0.8rem;
		border: 1px dashed var(--border);
	}

	.route-info small {
		color: var(--text-muted);
	}

	.other-users h3 {
		font-size: 1rem;
		margin-bottom: 12px;
	}

	.user-links {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.user-link {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		background: var(--bg);
		border-radius: var(--radius);
		border: 1px solid var(--border);
		font-size: 0.875rem;
	}

	.user-link:hover {
		border-color: var(--accent);
	}

	.user-link code {
		margin-left: auto;
		font-size: 0.75rem;
	}

	.not-found {
		text-align: center;
		padding: 48px;
	}

	.not-found p {
		color: var(--text-muted);
		margin-top: 8px;
	}
</style>
