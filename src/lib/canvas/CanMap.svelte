<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import {
		drawRoom,
		drawFloor,
		drawDoor,
		drawPlayer,
		drawWall
	} from './tilesCan'
	import { config, dungeon, player, frame } from '../game.svelte.ts'
	import { cubicOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'
	import Tile from './Tile.svelte'
	let tileSize = $derived(config.tileSize)
	let mapWidth = $derived(tileSize * config.cols)
	let mapHeight = $derived(tileSize * config.rows)

	let canvas: HTMLCanvasElement = $state(null)
	let ctx: CanvasRenderingContext2D = $state(null)

	let cameraX = new Tween(0, {
		duration: 400,
		easing: cubicOut
	})
	let cameraY = new Tween(0, {
		duration: 400,
		easing: cubicOut
	})
	const pathAtlas: Record<
		string,
		(
			ctx: CanvasRenderingContext2D,
			x: number,
			y: number,
			tileSize: number
		) => void
	> = {
		'#': drawWall,
		_: drawRoom,
		'.': drawFloor,
		D: drawDoor
	}

	function updateCamera() {
		let cx = player.position.x * tileSize - frame.camW / 2 + tileSize / 2
		let cy = player.position.y * tileSize - frame.camH / 2 + tileSize / 2

		// Begrenzung an Map-Ränder
		cx = Math.max(0, Math.min(cx, mapWidth - frame.camW))
		cy = Math.max(0, Math.min(cy, mapHeight - frame.camH))

		frame.camX = cx
		frame.camY = cy
		cameraX.target = cx
		cameraY.target = cy
	}
	function getVisibleTiles() {
		const startCol = Math.floor(frame.camX / tileSize)
		const startRow = Math.floor(frame.camY / tileSize)
		const endCol = Math.ceil((frame.camX + frame.camW) / tileSize)
		const endRow = Math.ceil((frame.camY + frame.camH) / tileSize)

		const tiles: { x: number; y: number; char: string; isPlayer: boolean }[] =
			[]

		for (let y = startRow; y < endRow; y++) {
			for (let x = startCol; x < endCol; x++) {
				if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
					const drawX = x * tileSize - frame.camX
					const drawY = y * tileSize - frame.camY
					const char = dungeon.map[y][x]
					tiles.push({
						x: drawX,
						y: drawY,
						char,
						isPlayer: x === player.position.x && y === player.position.y
					})
				}
			}
		}
		return tiles
	}

	// function render() {
	// 	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// 	const startCol = Math.floor(cameraX.current / tileSize)
	// 	const startRow = Math.floor(cameraY.current / tileSize)
	// 	const endCol = Math.ceil((cameraX.current + frame.camW) / tileSize)
	// 	const endRow = Math.ceil((cameraY.current + frame.camH) / tileSize)

	// 	for (let y = startRow; y < endRow; y++) {
	// 		for (let x = startCol; x < endCol; x++) {
	// 			if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
	// 				const drawX = x * tileSize - cameraX.current
	// 				const drawY = y * tileSize - cameraY.current
	// 				const char = dungeon.map[y][x]
	// 				const drawFn = pathAtlas[char]
	// 				if (drawFn) {
	// 					drawFn(ctx, drawX, drawY, tileSize)
	// 				}

	// 				// Spieler zeichnen
	// 				if (x === player.position.x && y === player.position.y) {
	// 					drawPlayer(ctx, drawX, drawY, tileSize)
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	$effect(() => {
		updateCamera(player)
		// render(player, dungeon)
		// renderMap(dungeon, player)
		// Symbol-Cache (einmal laden, dann wiederverwenden)
	})
</script>

<Canvas
	class="bg-neutral"
	bind:this={canvas}
	width={frame.camW}
	height={frame.camH}>
	{#each getVisibleTiles() as tile (tile.x + '-' + tile.y)}
		<!-- Tile zeichnen -->
		{#if tile.char !== '#'}
			<Tile
				x={tile.x}
				y={tile.y}
				width={tileSize}
				height={tileSize}
				char={tile.char} />
		{/if}
		<!-- Spieler zeichnen -->
		{#if tile.isPlayer}
			<Tile
				x={tile.x + 4}
				y={tile.y + 4}
				width={tileSize - 8}
				height={tileSize - 8}
				char="@" />
		{/if}
	{/each}
</Canvas>
