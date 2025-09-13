<script lang="ts">
	import { atlas } from './tilePaths.ts'
	import { Layer } from 'svelte-canvas'

	let { x, y, width, height, char = '#' } = $props()

	const render = ({ context }) => {
		// context.fillStyle = tileAtlas[char].color
		// context.fillRect(x, y, width, height)

		if (atlas[char].length) {
			const layers = atlas[char]

			context.save()
			context.translate(x, y)
			const scale = width / 64 // SVG ist 64x64
			context.scale(scale, scale)
			// context.globalAlpha = d.opacity
			layers.forEach((d) => {
				context.fillStyle = d.fill

				context.fill(d.path)
			})
			context.restore()
		}
	}
</script>

<Layer {render} />
