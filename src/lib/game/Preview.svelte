<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import { game } from '../game.svelte.ts'
	import Tile from './_gridTile.svelte'
	import Hero from './_gridMover.svelte'
	let { tileSize = 4 } = $props()
</script>

<Canvas
	width={game.grid.width * tileSize}
	height={game.grid.height * tileSize}
	class="bg-[#292524]">
	{#each game.dungeon.map as row, y (y)}
		{#each row as col, x (x)}
			{#if col !== '#'}
				<Tile color="#d6d3d1" {x} {y} {tileSize}></Tile>
			{/if}
		{/each}
	{/each}
	<Hero
		col="@"
		color="red"
		x={game.dungeon.position.x}
		y={game.dungeon.position.y}
		{tileSize}></Hero>
</Canvas>
