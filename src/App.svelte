<script>
  import T1 from './T1.svelte';

	import { Router, isActiveLink } from 'sv-router'
	import { game } from './lib/game.svelte.ts'
	import { nav, Sprites } from './lib'
	import { onMount } from 'svelte'
	import Login from './components/Login.svelte'
	import Root from './routes/Root.svelte'
	import supabase from './lib/supabase.js'
	import Preview from './lib/game/Preview.svelte'

	let session = $state(null)

	onMount(async () => {
		const { data } = await supabase.auth.getSession()
		session = data.session
		supabase.auth.onAuthStateChange(
			(_event, newSession) => (session = newSession)
		)
	})
</script>

{#snippet iconT(name, style)}
	<svg class="nwp-icon" {style}><use xlink:href="#{name}"></use></svg>
{/snippet}

<div class="app-layout sky">
	{#if session}
		<aside class="bg-base-200/80">
			<section class="flex min-w-48 flex-col p-4">
				<div class="flex items-center justify-between">
					<div class="text-xs font-medium">{session.user.email}</div>
					<button class="btn btn-circle btn-xs btn-error btn-soft">
						{@render iconT('nwp-auto-off', '--fs: 14px;')}
					</button>
				</div>
				<header class="mt-2 font-semibold underline">Options</header>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Type</span>
					<div>{game.grid.type}</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Size</span>
					<div>{game.grid.width}x{game.grid.height}</div>
				</div>
				<header class="mt-2 font-semibold underline">Dungeon</header>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Hero</span>
					<div>{game.dungeon.position.x}/{game.dungeon.position.y}</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Items</span>
					<div>{game.dungeon.items?.length}</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Enemys</span>
					<div>{game.dungeon.enemys?.length}</div>
				</div>
				<header class="mt-2 font-semibold underline">Hero</header>

				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">HP</span>
					<div>30</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Atc</span>
					<div>9</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Def</span>
					<div>6</div>
				</div>
				<div class="flex items-center justify-between gap-4">
					<span class="text-sm">Inv</span>
					<div>3</div>
				</div>
			</section>
		</aside>
		<main class="main sky">
			<Root></Root>
		</main>
	<T1></T1>
	{:else}
		<main class="main sky">
			<section class="nwp page center">
				<Login onLoginSuccess={() => (session = true)} />
			</section>
		</main>
	{/if}
</div>

<Sprites />
