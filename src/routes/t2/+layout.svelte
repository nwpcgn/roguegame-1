<script lang="ts">
	import { config } from '$lib/game.svelte.ts'

	let { children } = $props()

	console.log(config.type, config.rows, config.cols)
</script>

{@render children?.()}
