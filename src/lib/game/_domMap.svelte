<script lang="ts">
	import './styles/_domMap.css'
	import { game } from '../game.svelte.ts'
	const tileAtlas = {
		'#': { color: '#f8f9fa', name: 'wall', walkable: false },
		_: { color: '#1abc9c', name: 'room', walkable: true },
		D: { color: '#f39c12', name: 'door', walkable: true },
		'.': { color: '#3498db', name: 'floor', walkable: true }
	}
	let { cameraX = 0, cameraY = 0, tileSize = 20 } = $props()
</script>

<div class="rogue-grid" style="transform: translate({cameraX}px, {cameraY}px);">
	{#if !game.lock.render}
		{#each game.dungeon.map as row, y (y)}
			{#each row as col, x (x)}
				{#if game.inDistance(x, y, 4.8)}
					<div class="tile" class:opacity-5={!game.inDistance(x, y, 2.7)}>
						{@render tileEl(x, y, col)}
					</div>
				{:else}
					<span class="tile"></span>
				{/if}
			{/each}
		{/each}
	{/if}
</div>

{#snippet tileEl(x = 0, y = 0, col = '#')}
	<span class="tile-el {tileAtlas[col].name}">
		{#if col === '.'}
			{@render iconT('floor1')}
		{:else if col === '_'}
			{@render iconT('room1')}
		{:else if col === 'D'}
			{@render iconT('doorEl')}
		{:else}
			<span class="tile-sub center">{col}</span>
		{/if}
		{#if game.isPlayer(x, y)}
			<span class="tile-sub center player" style="--fs: {tileSize * 0.8}px; "
				><svg class="nwp-icon tile-sub"
					><use xlink:href="#nwp-logo-hero"></use></svg
				></span>
		{/if}
		{#if game.dungeon.isItem(x, y)}
			<span class="tile-sub center item" style="--fs: {tileSize * 0.5}px; "
				><svg class="nwp-icon center tile-sub"
					><use xlink:href="#nwp-logo-lobby"></use></svg
				></span>
		{/if}
	</span>
{/snippet}

{#snippet iconT(name)}
	<svg class="tile-sub" width={tileSize} height={tileSize}
		><use xlink:href="#{name}"></use></svg>
{/snippet}
