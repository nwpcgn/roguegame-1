<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import Rect from './Rect.svelte'
	import { dungeon, player } from '$lib/game.svelte.ts'
	import Room from './Room.svelte'
	let { maxSize = 160 } = $props()
	let tileSize = $derived(Math.floor(maxSize / dungeon.map[0].length))
	let canvas = $derived({
		width: dungeon.map[0].length * tileSize,
		height: dungeon.map.length * tileSize
	})

	// $inspect(dungeon.corridors?.filter((d) => d._endsWithAWall))
</script>

<Canvas class="bg-neutral" height={canvas.height} width={canvas.width}>
	{#each dungeon.map as row, y}
		{#each row as char, x}
			<Rect {char} {x} {y} size={tileSize}></Rect>
		{/each}
	{/each}
	{#each dungeon.rooms as { x1, y1, x2, y2, doors, centerX, centerY, roomId } (roomId)}
		<Room
			x={tileSize * x1}
			y={tileSize * y1}
			w={tileSize * (x2 - x1 + 1)}
			h={tileSize * (y2 - y1 + 1)}
			style={roomId == 0 ? '#3498db' : '#2980b9'}
			{roomId}></Room>
		{#each doors as { x, y }, id (id)}
			<Rect {x} {y} size={tileSize} char="D"></Rect>
		{/each}
	{/each}
	<Rect x={player.position.x} y={player.position.y} size={tileSize} char="@"
	></Rect>
</Canvas>

<!-- <div>
	{#each dungeon.rooms as { x1, y1, x2, y2, doors, centerX, centerY, roomId } (roomId)}
		<div class="py-2">
			<div></div>
			<pre>x: {x1}, y: {y1}, w: {x2 - x1}, h: {y2 - y1}</pre>
		</div>
	{/each}
</div> -->
