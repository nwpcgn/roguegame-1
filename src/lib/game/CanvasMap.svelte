<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import { game } from '../game.svelte.ts'
	import Tile from './_gridTile.svelte'
	import Hero from './_gridMover.svelte'
	const tileTypes = {
		'#': { color: '#f8f9fa', walkable: false },
		_: { color: '#1abc9c', walkable: true },
		D: { color: '#f39c12', walkable: true },
		'.': { color: '#3498db', walkable: true }
	}
	let { tileSize = 16 } = $props()
</script>

<Canvas
	width={game.width * tileSize}
	height={game.height * tileSize}
	class="border">
	{#each game.dungeon.map as row, y (y)}
		{#each row as col, x (x)}
			{#if col !== '#'}
				<Tile color={tileTypes[col].color} {x} {y} {tileSize}></Tile>
			{/if}
		{/each}
	{/each}
	<!-- 	{#each game.dungeon.items as { x, y, slug }}
		<Tile color="green" {x} {y} {tileSize}></Tile>
	{/each}
	{#each game.dungeon.enemys as { x, y }}
		<Tile color="blue" {x} {y} {tileSize}></Tile>
	{/each} -->
	<Hero
		col="@"
		color="red"
		x={game.dungeon.position.x}
		y={game.dungeon.position.y}
		{tileSize}></Hero>
</Canvas>
