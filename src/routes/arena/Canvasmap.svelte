<script lang="ts">
	import {
		drawRoom,
		drawFloor,
		drawDoor,
		drawPlayer,
		drawWall
	} from '$lib/tilesCan'
	import { config, dungeon, player, frame } from '$lib/game.svelte.ts'
	import { cubicOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'
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

	function render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		const startCol = Math.floor(frame.camX / tileSize)
		const startRow = Math.floor(frame.camY / tileSize)
		const endCol = Math.ceil((frame.camX + frame.camW) / tileSize)
		const endRow = Math.ceil((frame.camY + frame.camH) / tileSize)

		for (let y = startRow; y < endRow; y++) {
			for (let x = startCol; x < endCol; x++) {
				if (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
					const drawX = x * tileSize - cameraX.current
					const drawY = y * tileSize - cameraY.current
					const char = dungeon.map[y][x]
					const drawFn = pathAtlas[char]
					if (drawFn) {
						drawFn(ctx, drawX, drawY, tileSize)
					}

					// Spieler zeichnen
					if (x === player.position.x && y === player.position.y) {
						drawPlayer(ctx, drawX, drawY, tileSize)
					}
				}
			}
		}
	}

	$effect(() => {
		ctx = canvas.getContext('2d')
		if (!ctx) return

		updateCamera(player)
		render(player, dungeon)
		// renderMap(dungeon, player)
		// Symbol-Cache (einmal laden, dann wiederverwenden)
	})
</script>

<canvas
	class="bg-base-100/70"
	bind:this={canvas}
	width={frame.camW}
	height={frame.camH}></canvas>
