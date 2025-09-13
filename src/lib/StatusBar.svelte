<script lang="ts">
	import { config, dungeon, frame, player, buildMap } from './game.svelte.ts'
	const toggle = () => {
		frame.toggleView()
	}
</script>

{#snippet statusCard(name = 'Name', data = {}, component)}
	<div
		class="divide-y divide-base-300 rounded-box bg-base-100 px-4 py-2 text-base-content shadow-lg">
		<header class="flex items-center justify-between gap-6 py-1">
			<h2 class="text-lg font-semibold">{name}</h2>
			{#if component}
				{@render component()}
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
{#snippet iconT(name)}
	<svg class="nwp-icon" style="--fs: 14px;"
		><use xlink:href="#{name}"></use></svg>
{/snippet}
{#snippet viewSwitch()}
	<button
		onclick={toggle}
		class="btn btn-circle btn-soft btn-xs btn-error"
		aria-label="toggle">{@render iconT('rpg-toggle')}</button>
{/snippet}
{#snippet buttonMap()}
	<button
		onclick={buildMap}
		class="btn btn-circle btn-soft btn-xs btn-neutral"
		aria-label="buildMap">
		{@render iconT('rpg-refresh')}
	</button>
{/snippet}
{#snippet openSettings()}
	<a
		href="#/settings"
		class="btn btn-circle btn-soft btn-xs btn-secondary"
		aria-label="Settings">
		{@render iconT('rpg-pen')}
	</a>
{/snippet}
{#snippet openArena()}
	<a
		href="#/arena"
		class="btn btn-circle btn-soft btn-xs btn-secondary"
		aria-label="Settings">
		{@render iconT('rpg-pokeball')}
	</a>
{/snippet}
<aside class="aside bg-neutral p-4 text-neutral-content">
	<div class="flex flex-col gap-2">
		{@render statusCard('Settings', config.stateObj(), openSettings)}
		{@render statusCard('Player', player.stateObj(), openArena)}
		{@render statusCard('Dungeon', dungeon.stateObj(), buttonMap)}
		{@render statusCard('Frame', frame.stateObj(), viewSwitch)}
	</div>
</aside>
