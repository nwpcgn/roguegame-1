<script lang="ts">
	import './styles/_domMap.css'
	import HtmlMap from './_domMap.svelte'
	import Modal from '../components/Modal.svelte'
	import { game } from '../game.svelte.ts'
	const moveDelay = 180
	const tileAtlas = {
		'#': { color: '#f8f9fa', name: 'wall', walkable: false },
		_: { color: '#1abc9c', name: 'room', walkable: true },
		D: { color: '#f39c12', name: 'door', walkable: true },
		'.': { color: '#3498db', name: 'floor', walkable: true }
	}
	let { frameWidth = 512, frameHeight = 512 } = $props()
	let moveCooldown = $state(0)
	let showModal = $state(false)
	let tileSize = $derived(game.grid.size)
	let cameraX = $state(0)
	let cameraY = $state(0)
	let itemObj = $state({})

	function updateCamera() {
		const worldWidth = game.grid.width * tileSize
		const worldHeight = game.grid.height * tileSize
		const centerX = frameWidth / 2
		const centerY = frameHeight / 2

		let offsetX = -game.dungeon.position.x * tileSize + centerX - tileSize / 2
		let offsetY = -game.dungeon.position.y * tileSize + centerY - tileSize / 2

		// Begrenzung: Kamera darf Map nicht verlassen
		offsetX = Math.min(0, Math.max(offsetX, frameWidth - worldWidth))
		offsetY = Math.min(0, Math.max(offsetY, frameHeight - worldHeight))

		cameraX = offsetX
		cameraY = offsetY
	}

	function movePlayer(dx: number, dy: number) {
		if (moveCooldown > Date.now()) return
		const targetX = game.dungeon.position.x + dx
		const targetY = game.dungeon.position.y + dy

		const cell = game.dungeon.map[targetY][targetX]

		if (tileAtlas[cell].walkable) {
			const item = game.dungeon.isItem(targetX, targetY)
			game.updateHero({ x: targetX, y: targetY })
			moveCooldown = Date.now() + moveDelay
			if (item) {
				game.dungeon.removeItem(targetX, targetY)

				itemObj = game.addInventar()
				showModal = true
			}
		}
	}

	function handleKey(e: KeyboardEvent) {
		// console.log(e.key)
		if (e.key === 'ArrowUp') movePlayer(0, -1)
		if (e.key === 'ArrowDown') movePlayer(0, 1)
		if (e.key === 'ArrowLeft') movePlayer(-1, 0)
		if (e.key === 'ArrowRight') movePlayer(1, 0)
	}

	$effect(() => {
		updateCamera(game.dungeon.position)
	})
</script>

<svelte:window onkeydown={handleKey} />

<div
	class="frame"
	style="--fw: {frameWidth}px; --fh: {frameHeight}px; {game.gridStyle}">
	<HtmlMap {cameraX} {cameraY} {tileSize}></HtmlMap>
</div>

<Modal
	bind:showModal
	onClose={() => {
		console.log('Modal Close')
	}}>
	<div>Modal</div>
</Modal>
