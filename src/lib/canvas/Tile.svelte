<script>
	import { atlas } from './tilePaths.ts'
	import { Layer } from 'svelte-canvas'

	const tileAtlas = {
		'#': { char: '#', color: '#1E293B', symbol: 'wall-tile' },
		'.': { char: '.', color: '#94A3B8', symbol: 'floor-tile' },
		_: { char: '_', color: '#0284c7', symbol: 'room-tile' },
		D: { char: 'D', color: '#be185d', symbol: 'door-tile' },
		'*': { char: '*', color: '#f97316', symbol: 'item-tile' },
		'@': { char: '@', color: '#fbbf24', symbol: 'player-tile' }
	}
	let { x, y, width, height, char } = $props()

	const render = ({ context }) => {
		context.fillStyle = tileAtlas[char].color
		context.fillRect(x, y, width, height)
	}
</script>

<Layer {render} />
