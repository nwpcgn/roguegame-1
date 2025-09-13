<script lang="ts">
	import DomMap from '$lib/DomMap.svelte'
	import CanMap from '$lib/canvas/CanMap.svelte'
	import { dungeon, frame, player, buildMap } from '$lib/game.svelte.ts'
	import { onMount } from 'svelte'

	function movePlayer(dx: number, dy: number) {
		const newX = player.position.x + dx
		const newY = player.position.y + dy
		const char = dungeon.map[newY][newX]

		if (char !== '#') {
			player.position = { x: newX, y: newY }
			// audioPlayer(audio.click)
		} else {
			// audioPlayer(audio.hit)
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			movePlayer(0, -1)
		}
		if (e.key === 'ArrowDown') movePlayer(0, 1)
		if (e.key === 'ArrowLeft') movePlayer(-1, 0)
		if (e.key === 'ArrowRight') movePlayer(1, 0)
	}

	onMount(() => {
		if (!dungeon.freeCells.length) buildMap()
	})
</script>

<svelte:window on:keydown={handleKey} />
{#key dungeon.map}
	<div class="page nwp center fix">
		<div class="border bg-neutral text-neutral-content">
			{#if frame.canvasView}
				<CanMap></CanMap>
			{:else}
				<DomMap></DomMap>
			{/if}
		</div>
	</div>
{/key}
