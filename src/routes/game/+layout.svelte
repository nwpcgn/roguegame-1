<script lang="ts">
	import { config, dungeon, frame } from '$lib/game.svelte.ts'
	import StatusBar from '$lib/StatusBar.svelte'
	import StatusBar2 from '$lib/StatusBar2.svelte'
	let { children } = $props()

	// $effect(() => {
	// 	if (frame.frameW || frame.frameH) {
	// 		config.gridSize = Math.min(
	// 			Math.floor((frame.frameW * 0.96) / config.cols),
	// 			Math.floor((frame.frameH * 0.96) / config.rows)
	// 		)
	// 	}
	// })
</script>

<main
	class="main sky"
	bind:clientWidth={frame.frameW}
	bind:clientHeight={frame.frameH}>
	{@render children?.()}
</main>
<StatusBar></StatusBar>
<StatusBar2></StatusBar2>
