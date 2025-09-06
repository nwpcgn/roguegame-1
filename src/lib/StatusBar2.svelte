<script lang="ts">
    // import '../nes.css'
	import {
		config,
		dungeon,
		frame,
		player,
		buildMap,
		openConfig
	} from './game.svelte.ts'
</script>

{#snippet cardT(name = 'Name', data = {}, label = 'Run', action)}
	<div
		class="divide-base-300 rounded-box bg-base-100 divide-y px-4 py-2 shadow-lg">
		<header class="flex items-center justify-between gap-6">
			<h2 class="text-lg font-semibold">{name}</h2>
			{#if action}
				<button class="btn btn-soft btn-xs" onclick={action}>{label}</button>
			{:else}
				<span></span>
			{/if}
		</header>

		{#each Object.entries(data) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span class="text-xs font-light capitalize opacity-60">{k}</span>
				<span class="font-thinx text-base tabular-nums">{v}</span>
			</div>
		{/each}
	</div>
{/snippet}

<aside class="aside-dock bg-base-200 p-4 nes">
	<div class="flex flex-col gap-2">
		{@render cardT('Dungeon', dungeon.stateObj(), 'New', buildMap)}
		{@render cardT('Settings', config.stateObj(), 'Edit', openConfig)}

		{@render cardT('Fame', frame.stateObj(), null, null)}
		{@render cardT('Player', player.stateObj(), null, null)}
	</div>
</aside>
