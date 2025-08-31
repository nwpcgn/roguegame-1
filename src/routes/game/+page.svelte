<script lang="ts">
	import DomMap from '$lib/DomMap.svelte'
	// import CanMap from '$lib/CanMap.svelte'
	import {
		config,
		dungeon,
		player,
		buildMap,
		openConfig
	} from '$lib/game.svelte.ts'
	import { onMount } from 'svelte'
	const audio = {}
	audio.select = new Audio('./audio/blipSelect.mp3')
	audio.click = new Audio('./audio/click.mp3')
	audio.explosion = new Audio('./audio/explosion.mp3')
	audio.hit = new Audio('./audio/hitHurt.mp3')
	audio.jump = new Audio('./audio/jump.mp3')
	audio.shoot = new Audio('./audio/laserShoot.mp3')
	audio.coin = new Audio('./audio/pickupCoin.mp3')
	audio.upgrade = new Audio('./audio/powerUp.mp3')
	function audioPlayer(audioEl) {
		if (audioEl.duration > 0 && !audioEl.paused) {
			//already playing
			audioEl.pause()
			audioEl.currentTime = 0
			audioEl.play()
		} else {
			//not playing
			audioEl.play()
		}
	}

	function movePlayer(dx: number, dy: number) {
		const newX = player.position.x + dx
		const newY = player.position.y + dy
		const char = dungeon.map[newY][newX]

		if (char !== '#') {
			player.position = { x: newX, y: newY }
			audioPlayer(audio.click)
		} else {
			audioPlayer(audio.hit)
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
		buildMap()
	})
</script>

<svelte:window on:keydown={handleKey} />
{#key dungeon.map}
	<div class="page nwp center">
		<div class="border">
			<DomMap></DomMap>
		</div>
	</div>
{/key}
