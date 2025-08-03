<script>
	let mW = $state(30)
	let mH = $state(30)
	let mT = $state('Uniform')
</script>

<div class="flex flex-col gap-4">
	<ul class="list">
		<li class="bg-base-100 p-4 pb-2 text-lg font-bold tracking-wide">
			Map Config
		</li>
		<li class="list-row items-center">
			<div class="list-col-grow">
				<div class="font-medium">Width</div>
			</div>
			<input type="number" class="input" bind:value={mW} />
		</li>
		<li class="list-row items-center">
			<div class="list-col-grow">
				<div class="font-medium">Height</div>
			</div>
			<input type="number" class="input" bind:value={mH} />
		</li>
		<li class="list-row items-center">
			<div class="list-col-grow">
				<div class="font-medium">Generator</div>
			</div>
			<select class="select" bind:value={mT}>
				{#each ['Digger', 'Uniform'] as item, i}
					<option value={item}>{item}</option>
				{/each}
			</select>
		</li>
		<!-- 		<li class="list-row items-center">
			<div class="list-col-grow">
				<div></div>
			</div>
			<div class="join">
				<button class="btn btn-neutral join-item">Assume</button>
				<button class="btn join-item">Cancel</button>
			</div>
		</li> -->
	</ul>
</div>
