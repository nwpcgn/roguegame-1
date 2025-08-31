<script lang="ts">
	import StatusBar from './StatusBar.svelte'

	import DomMap from '$lib/DomMap.svelte'
	// import CanMap from '$lib/CanMap.svelte'
	import { config, dungeon, player, buildMap } from '$lib/game.svelte.ts'
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

	let dialogEl = $state()


	const openConfig = () => {
		dialogEl.showModal()
		audioPlayer(audio.click)
	}

	function movePlayer(dx: number, dy: number) {
		const newX = player.position.x + dx
		const newY = player.position.y + dy
		const char = dungeon.map[newY][newX]

		if (char !== '#') {
			player.position = { x: newX, y: newY }
			audioPlayer(audio.coin)
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
</script>

<svelte:window on:keydown={handleKey} />

<div class="main">
	<div class="page bg-base-100 nwp">
		<div class="content">
			<DomMap></DomMap>
		</div>
	</div>
</div>
<StatusBar {openConfig}></StatusBar>

<dialog bind:this={dialogEl} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<div class="flex flex-col gap-4">
			{#each Object.entries(config.stateObj()) as [k, v] (k)}
				<div class="flex items-center gap-4">
					<span class="flex-1 capitalize">{k}</span>
					{#if k === 'type'}
						<select
							class="select w-32"
							onblur={(e) => {
								config[k] = e.currentTarget.value
								buildMap()
							}}
							value={config.type}>
							{#each ['Uniform', 'Digger'] as item}
								<option value={item}>{item}</option>
							{/each}
						</select>
					{:else}
						<input
							type="number"
							value={v}
							class="input w-24"
							min={20}
							max={100}
							onblur={(e) => {
								config[k] = e.currentTarget.value
								buildMap()
							}} />
					{/if}
				</div>
			{/each}
		</div>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
