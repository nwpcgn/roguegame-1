<script lang="ts">
	import { drawRoom, drawFloor, drawDoor } from '$lib/tilesCan'
	import { cubicOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'
	let {
		tileSize = 20,
		width = 30,
		height = 30,
		dungeon,
		player = { x: 0, y: 0 }
	} = $props()

	let mapWidth = 40
	let mapHeight = 40

	let frameWidth = 512
	let frameHeight = 512
	let canvas: HTMLCanvasElement = $state(null)
	let ctx: CanvasRenderingContext2D = $state(null)

	const pathAtlas: Record<
		string,
		(
			ctx: CanvasRenderingContext2D,
			x: number,
			y: number,
			tileSize: number
		) => void
	> = {
		_: drawRoom,
		'.': drawFloor,
		D: drawDoor
	}

	async function renderMap() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (let y = 0; y < dungeon.map.length; y++) {
			for (let x = 0; x < dungeon.map[y].length; x++) {
				const char = dungeon.map[y][x]
				const drawFn = pathAtlas[char]
				if (drawFn) {
					drawFn(ctx, x * tileSize, y * tileSize, tileSize)
				}
			}
		}

		ctx.fillStyle = 'green'
		ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize)
	}

	$effect(() => {
		ctx = canvas.getContext('2d')
		if (!ctx) return
		renderMap(dungeon)
		// Symbol-Cache (einmal laden, dann wiederverwenden)
	})
</script>

<section>
	<canvas
		class="bg-base-200"
		bind:this={canvas}
		width={width * tileSize}
		height={height * tileSize}></canvas>
</section>

<!-- <div class="rogue-grid" style={gridStyle}>
		{#each dungeon.map as row, y}
			{#each row as col, x}
				<span
					class="tile {tileAtlas[col]?.className}"
					style="background-color: {tileAtlas[col]?.bc}; color: {tileAtlas[col]
						?.fc};"
					data-x={x}
					data-y={y}
					data-col={col}>
					{#if col !== '#'}
						{@render iconT(`${tileAtlas[col]?.type}-tile`)}
					{/if}
				</span>
			{/each}
		{/each}
	</div> -->
