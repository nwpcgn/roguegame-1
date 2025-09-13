<script lang="ts">
	import MapInfo from '../lib/MapInfo.svelte'

	import MiniMap from '$lib/canvas/MiniMap.svelte'
	import { dungeon, buildMap } from '$lib/game.svelte.ts'
	let { data } = $props()
</script>

<section class="page nwp center">
	<article class="rounded-box bg-base-100/50 p-8 shadow">
		<hgroup class="text-center">
			<h1>{data.nav[0]?.title}</h1>
			<h2>{data.nav[0]?.name}</h2>
		</hgroup>

		<div class="flex flex-col items-center gap-4">
			{#if dungeon.freeCells.length}
				<MiniMap maxSize={280}></MiniMap>
			{/if}
			<button class="btn rounded-full btn-sm btn-neutral" onclick={buildMap}
				>Create Map</button>
			<!-- {#if dungeon.freeCells.length}
				<div class="self-stretch">
					<nav class="grid grid-cols-3 gap-2">
						{#each data.nav as { name, href, slug } (slug)}
							{#if slug !== 'start'}
								<a href="#{href}" class="btn btn-soft">{name}</a>
							{/if}
						{/each}
					</nav>
				</div>
			{/if} -->
			{#if dungeon.freeCells.length}
				<MapInfo></MapInfo>
			{/if}
		</div>
	</article>
</section>
