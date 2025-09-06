<script lang="ts">
	import { config, dungeon, player, frame } from '$lib/game.svelte.ts'
	import { cubicOut } from 'svelte/easing'
	import { Tween } from 'svelte/motion'
	const tileAtlas = {
		'#': {
			char: '#',
			bc: 'transparent',
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

	let gridSize = $derived(config.gridSize)
	let mapWidth = $derived(gridSize * config.cols)
	let mapHeight = $derived(gridSize * config.rows)
	let cameraX = new Tween(0, {
		duration: 400,
		easing: cubicOut
	})
	let cameraY = new Tween(0, {
		duration: 400,
		easing: cubicOut
	})
	let gridStyle = $derived(
		`--rg-w: ${config?.cols};--rg-h: ${config?.rows};--rg-s: ${config?.gridSize}px; 
		--cam-x: -${cameraX.current}px; --cam-y: -${cameraY.current}px; --cam-w: ${frame.camW}px; --cam-h: ${frame.camH}px;`
	)
	function updateCamera() {
		let cx = player.position.x * gridSize - frame.camW / 2 + gridSize / 2
		let cy = player.position.y * gridSize - frame.camH / 2 + gridSize / 2
		// Begrenzung an Map-Ränder
		cx = Math.max(0, Math.min(cx, mapWidth - frame.camW))
		cy = Math.max(0, Math.min(cy, mapHeight - frame.camH))

		frame.camX = cx
		frame.camY = cy
		cameraX.target = cx
		cameraY.target = cy
	}

	function isPlayer(x = 0, y = 0) {
		return x == player.position.x && y == player.position.y
	}

	$effect(() => {
		updateCamera(player)
	})
</script>

<section class="dom-frame">
	<!-- <pre>{Object.keys(style['.']).join(', ')}</pre> -->

	<div class="rogue-grid" style={gridStyle}>
		{#each dungeon.map as row, y}
			{#each row as col, x}
				<span
					class="tile"
					style="background-color: {tileAtlas[col]?.bc}; color: {tileAtlas[col]
						?.fc};"
					data-x={x}
					data-y={y}
					data-col={col}>
					{#if col !== '#'}
						{@render iconT(`${tileAtlas[col]?.type}-tile`)}
						{#if isPlayer(x, y)}
							<span class="bg-info/60"></span>
						{/if}
					{:else}
						<span class="bg-base-100/10">{col}</span>
					{/if}
				</span>
			{/each}
		{/each}
	</div>
</section>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

<style>
	:root {
		--rg-w: 20;
		--rg-h: 20;
		--rg-s: 20px;
		--cam-w: 512px;
		--cam-h: 512px;
		--cam-x: 0px;
		--cam-y: 0px;
	}
	.dom-frame {
		width: var(--cam-w);
		height: var(--cam-h);
		overflow: hidden;
		position: relative;
		border: 2px solid #444;
	}

	.rogue-grid {
		position: absolute;
		transform: translate(var(--cam-x), var(--cam-y));
	}
	.rogue-grid {
		display: grid;
		grid-template-columns: repeat(var(--rg-w, 20), var(--rg-s, 20px));
		grid-template-rows: repeat(var(--rg-h, 20), var(--rg-s, 20px));
		gap: 0px;
		padding: 0px;
		transition: transform 0.1s linear;
		/* background-color: var(--color-base-100); */
		svg {
			width: var(--rg-s, 20px);
			height: var(--rg-s, 20px);
			display: inline-block;
			stroke-width: 0;
			stroke: currentColor;
		}
		.tile {
			width: var(--rg-s, 20px);
			height: var(--rg-s, 20px);
			/* background-color: var(--color-base-300); */
			font-size: calc(var(--rg-s) * 0.5);
			font-weight: 200;
			font-family: monospace;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			grid-template-areas: 'col';

			> * {
				grid-area: col;
				width: 100%;
				height: 100%;
				display: grid;
				place-content: center;
			}
		}
	}
</style>
