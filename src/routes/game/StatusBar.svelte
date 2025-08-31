<script lang="ts">
	import { config, dungeon, player, buildMap } from '$lib/game.svelte.ts'

	let { openConfig } = $props()

/* 	const buildMap = () => {
		dungeon.create()

		const randomItem =
			dungeon.freeCells[Math.floor(Math.random() * dungeon.freeCells.length)]
		const [x, y] = randomItem.split(',').map(Number)
		player.position = { x, y }
	} */
</script>

{#snippet cardT(name = 'Name', data = {}, label = 'Run', action)}
	<div class="bg-base-100 rounded-box px-4 py-2 shadow-lg">
		<header class="flex items-center justify-between gap-6">
			<h2 class="text-lg font-semibold">{name}</h2>
			{#if action}
				<button class="btn btn-xs btn-soft" onclick={action}>{label}</button>
			{:else}
				<span></span>
			{/if}
		</header>

		{#each Object.entries(data) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span class="text-sm font-light capitalize opacity-60">{k}</span>
				<span class="text-base font-thin tabular-nums">{v}</span>
			</div>
		{/each}
	</div>
{/snippet}
<div class="aside bg-base-200 p-4">
	<div class="flex flex-col gap-2">
		{@render cardT('Settings', config.stateObj(), 'Edit', openConfig)}
		{@render cardT('Dungeon', dungeon.stateObj(), 'New', buildMap)}
		{@render cardT('Player', player.stateObj(), 'Info', openConfig)}
	</div>
</div>
