<script lang="ts">
	import { dungeon, buildMap, config } from '$lib/game.svelte.ts'
	let { data } = $props()
	const tabs = {
		map: mapT,
		rooms: roomsT,
		corridors: corridorsT
	}
	let actTab = $state('map')
</script>

{#snippet mapT()}
	<div>
		{#each Object.entries(config.stateObj()) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span class="text-xs font-light capitalize opacity-60">{k}</span>
				<span class="font-thinx text-base tabular-nums">{v}</span>
			</div>
		{/each}
		<!--  -->
	</div>
	<nav class="flex gap-1 py-2">
		<button class="btn rounded-full btn-sm btn-neutral" onclick={buildMap}
			>Create Map</button>
	</nav>
{/snippet}
{#snippet roomsT()}
	<div>Rooms</div>
{/snippet}
{#snippet corridorsT()}
	<div>Corridors</div>
{/snippet}
<div class="flex flex-col gap-4 self-stretch">
	<div class="flex justify-center gap-2 p-2">
		<nav
			role="tablist"
			class="tabs-border tabs grid grid-cols-3 rounded-box bg-base-100">
			{#each Object.keys(tabs) as tab, id (id)}
				<button
					onclick={() => {
						actTab = tab
					}}
					role="tab"
					class="tab"
					class:tab-active={tab === actTab}>
					<span class="capitalize">{tab}</span>
				</button>
			{/each}
		</nav>
		<!-- <span class="flex-1"></span> -->
	</div>
	<div class="rounded-box bg-base-100 p-4">
		{#each Object.entries(tabs) as [key, component] (key)}
			{#if actTab === key}
				{@render component?.(key)}
			{/if}
		{/each}
	</div>
</div>
