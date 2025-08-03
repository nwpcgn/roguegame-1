<script lang="ts">
	import Dashboard from '../components/Dashboard.svelte'
	import Options from '../components/Options.svelte'
	import Preview from '../lib/game/Preview.svelte'
	import { game } from '../lib/game.svelte'
	let elem = $state()
	const openSettings = () => {
		if (!elem) return

		elem.showModal()
	}
	const handleNew = () => {
		game.createMap()
	}
</script>

<section class="nwp page items-center justify-around">
	<div class="join join-vertical w-56">
		<button class="btn btn-lg join-item" onclick={handleNew}>New</button>
		<button class="btn btn-lg join-item">Load</button>
		<button class="btn btn-lg join-item">Options</button>
	</div>

	<Preview tileSize={6}></Preview>
</section>

<!-- <dialog bind:this={elem} class="modal">
	<div class="modal-box">
		<Options></Options>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-info">Save</button>
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog> -->
