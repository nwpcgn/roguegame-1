<script lang="ts">
	import DomMap from '$lib/DomMap.svelte'
	// import CanMap from '$lib/CanMap.svelte'
	import { config, dungeon } from '$lib/game.svelte.ts'
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
	let position = $state({
		x: 0,
		y: 0
	})

	const buildMap = () => {
		dungeon.create()

		const randomItem =
			dungeon.freeCells[Math.floor(Math.random() * dungeon.freeCells.length)]
		const [x, y] = randomItem.split(',').map(Number)

		position = { ...position, x, y }
	}
	const openConfig = () => {
		console.log('open')
		dialogEl.showModal()
		audioPlayer(audio.click)
	}

	function movePlayer(dx: number, dy: number) {
		const newX = position.x + dx
		const newY = position.y + dy
		const char = dungeon.map[newY][newX]

		if (char !== '#') {
			position.x = newX
			position.y = newY
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
			<DomMap {config} {dungeon} {position} {buildMap} {openConfig}></DomMap>
		</div>
	</div>
</div>
<div class="aside bg-base-200 p-4">
	<div class="flex flex-col gap-2">
		{@render cardT('Settings', config.stateObj(), 'Edit', openConfig)}
		{@render cardT('Dungeon', dungeon.stateObj(), 'New', buildMap)}
		{@render cardT('Position', position, '', null)}
	</div>
</div>

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

{#snippet cardT(name = 'Name', data = {}, label = 'Run', action)}
	<div class="bg-base-100 rounded-box px-4 py-2 shadow-lg">
		<header class="flex items-center justify-between gap-6">
			<h2 class="text-lg font-semibold">{name}</h2>
			{#if action}
				<button class="btn btn-xs btn-soft" onclick={action}>{label}</button>
			{:else}
				<span></span>
			{/if}
		</header>

		{#each Object.entries(data) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span class="text-sm font-light capitalize opacity-60">{k}</span>
				<span class="text-base font-thin tabular-nums">{v}</span>
			</div>
		{/each}
	</div>
{/snippet}
