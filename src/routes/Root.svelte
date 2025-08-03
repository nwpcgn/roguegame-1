<script lang="ts">
	import { game } from '../lib/game.svelte.ts'
	import View1 from './View1.svelte'
	import View2 from './View2.svelte'
	import View3 from './View3.svelte'
	let elem = $state()

	const mainMenu = [
		{
			slug: 'home',
			name: 'Start',
			icon: 'nwp-home',
			title: 'My Dungerue',
			type: 'page',
			menu: [
				{
					slug: 'info',
					name: 'Instructions',
					icon: 'nwp-warning',
					title: 'Instructions',
					type: 'dialog'
				},
				{
					slug: 'settings',
					name: 'Settings',
					icon: 'nwp-settings',
					title: 'Game Options',
					type: 'dialog'
				},
				{
					slug: 'create',
					name: 'Generator',
					icon: 'nwp-generator',
					title: 'Map Generator',
					type: 'dialog'
				}
			]
		},
		{
			slug: 'game',
			name: 'Play',
			icon: 'nwp-game',
			title: 'Tuvale Forest',
			type: 'page',
			menu: [
				{
					slug: 'map',
					name: 'Region',
					icon: 'nwp-map',
					title: 'Dungeon Map',
					type: 'view'
				},
				{
					slug: 'arena',
					name: 'Arena',
					icon: 'nwp-arena',
					title: 'Battleground',
					type: 'view'
				},
				{
					slug: 'ending',
					name: 'Finals',
					icon: 'nwp-story',
					title: 'Death Screen',
					type: 'dialog'
				}
			]
		}
	]
</script>

<View1></View1>

<dialog bind:this={elem} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
