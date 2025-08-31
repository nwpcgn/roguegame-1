<script lang="ts">
	import DomMap from '$lib/DomMap.svelte'
	import CanMap from '$lib/CanMap.svelte'
	import generateMap from '$lib/createMap'
	const tileAtlas = {
		'#': {
			char: '#',
			bc: '#f8f9fa',
			fc: '#f8f9fa',
			walkable: false,
			isAction: false,
			type: 'wall',
			symbol: 'wall-tile'
		},
		'.': {
			char: '.',
			bc: 'transparent',
			fc: '#bdc3c7',
			walkable: true,
			isAction: false,
			type: 'floor',
			symbol: 'floor-tile'
		},
		_: {
			char: '_',
			bc: 'trasparent',
			fc: '#3498db',
			walkable: true,
			isAction: false,
			type: 'room',
			symbol: 'room-tile'
		},
		D: {
			char: 'D',
			bc: '#c0392b',
			fc: '#333333',
			walkable: true,
			isAction: true,
			type: 'door',
			symbol: 'door-tile'
		},
		'*': {
			char: '*',
			bc: '#ec4899',
			fc: '#ec4899',
			walkable: true,
			isAction: true,
			type: 'item',
			symbol: 'item-tile'
		},
		'€': {
			char: '€',
			bc: '#ef4444',
			fc: '#ef4444',
			walkable: true,
			isAction: true,
			type: 'enemy',
			symbol: 'enemy-tile'
		}
	}
	let dialogEl = $state()
	let config = $state({
		type: 'Digger',
		width: 25,
		height: 25,
		size: 20
	})

	let dungeon = $state({
		map: Array.from({ length: config.height }, () =>
			Array(config.width).fill('#')
		),
		rooms: [],
		corridors: [],
		freeCells: []
	})
	let player = $state({ x: 0, y: 0 })
	const generateDungeon = () => {
		const data = generateMap(config.width, config.height, config.type)
		dungeon.map = data.map
		dungeon.rooms = data.rooms
		dungeon.corridors = data.corridors
		dungeon.freeCells = data.freeCells

		const randomItem =
			dungeon.freeCells[Math.floor(Math.random() * dungeon.freeCells.length)]
		const [x, y] = randomItem.split(',').map(Number)

		player = { ...player, x, y }
	}
</script>

<div class="main">
	<div class="page bg-base-100">
		<div class="content">
			<header class="flex items-center justify-between gap-4">
				<h1 class="text-5xl font-bold">Rot JS</h1>
			</header>
			<header class="flex items-center justify-between gap-4 py-4">
				<h4 class="text-lg">
					Dungeon-Map <small class="opacity-50"
						>{config.width}x{config.height}</small>
				</h4>
				<nav class="join">
					<button
						class="btn btn-sm join-item"
						onclick={() => {
							dialogEl.showModal()
						}}>Config</button>
					<button
						class="btn btn-sm btn-neutral join-item"
						onclick={generateDungeon}>Create</button>
				</nav>
			</header>
			<CanMap {...config} {dungeon} {player} tileSize={32}></CanMap>
		</div>
	</div>
</div>
<div class="left">
	<!-- <textarea name="" id="">{JSON.stringify(Object.values(tileAtlas))}</textarea> -->
</div>
<div class="right">
	<div class="flax flex-col gap-2 p-4 capitalize">
		<h2 class="text-xl font-bold">Config</h2>
		{#each Object.entries(config) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span>{k}</span>
				<span>{v}</span>
			</div>
		{/each}
		<h2 class="text-xl font-bold">Dungeon</h2>
		{#each Object.entries(dungeon) as [k, v] (k)}
			{#if k !== 'map'}
				<div class="flex items-center justify-between gap-6">
					<span>{k}</span>
					<span>{v.length}</span>
				</div>
			{/if}
		{/each}
		<h2 class="text-xl font-bold">Player</h2>
		{#each Object.entries(player) as [k, v] (k)}
			<div class="flex items-center justify-between gap-6">
				<span>{k}</span>
				<span>{v}</span>
			</div>
		{/each}
	</div>
</div>

<dialog bind:this={dialogEl} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<div class="flex flex-col gap-4">
			{#each Object.entries(config) as [k, v] (k)}
				<div class="flex items-center gap-4">
					<span class="flex-1 capitalize">{k}</span>
					{#if k === 'type'}
						<select
							class="select w-32"
							onchange={(e) => {
								config[k] = e.currentTarget.value
								generateDungeon()
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
							onchange={(e) => {
								config[k] = e.currentTarget.value
								generateDungeon()
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
