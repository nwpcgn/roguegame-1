<script lang="ts">
	import { page } from '$app/state'
	const nav = [
		{
			slug: 'start',
			name: 'Lobby',
			href: '/',
			icon: 'nwp-home',
			hidden: false
		},
		{
			slug: 'game',
			name: 'Game',
			href: '/game',
			icon: 'nwp-game',
			hidden: false
		},
		{
			slug: 'editor',
			name: 'Editor',
			href: '/editor',
			icon: 'nwp-options',
			hidden: false
		}
	]
	let current = $derived(page.url.hash.replace('#', ''))
</script>

<div>
	<ul class="menu menu-horizontal menu-sm rounded-box bg-base-200">
		{#each nav as { name, href, slug } (slug)}
			{#if current !== href}
				<li><a href="#{href}">{name}</a></li>
			{:else}
				<li class="menu-disabled"><a>{name}</a></li>
			{/if}
		{/each}
	</ul>
</div>
