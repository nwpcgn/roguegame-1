<script>
	import { Layer } from 'svelte-canvas'
	let { x, y, w, h, roomId, style = 'red' } = $props()
	// console.log({ roomId, x, y, w, h })
	const render = ({ context }) => {
		context.fillStyle = style
		context.fillRect(x, y, w, h)
	}
</script>

<Layer {render} />
