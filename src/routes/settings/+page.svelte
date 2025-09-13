<script lang="ts">
	import { config, buildMap } from '$lib/game.svelte.ts'
</script>

<section class="nwp page center">
	<div class="card-border card w-sm bg-base-100/75">
		<div class="card-body">
			<h2 class="card-title">Settings</h2>
			{@render configCard()}
			<div class="card-actions justify-end">
				<a href="#/" class="btn btn-neutral">Close</a>
			</div>
		</div>
	</div>
</section>

{#snippet configCard()}
	<div class="flex flex-col gap-2">
		{#each Object.entries(config.configObj()) as [k, v] (k)}
			<div class="flex items-center gap-4">
				<span class="flex-1 font-semibold capitalize">{k}</span>
				{#if k === 'type'}
					<!-- <select
						class="select select-sm w-32"
						onchange={(e) => {
							config[k] = e.currentTarget.value
							buildMap()
						}}
						value={config.type}>
						{#each ['Uniform', 'Digger'] as item (item)}
							<option value={item}>{item}</option>
						{/each}
					</select> -->
					<div class="join">
						{#each ['Uniform', 'Digger'] as item (item)}
							<input
								onclick={(e) => {
									config.type = e.currentTarget.value
								}}
								type="button"
								class="btn join-item btn-sm"
								class:btn-neutral={config.type === item}
								value={item} />
						{/each}
					</div>
				{:else}
					<input
						type="number"
						value={v}
						class="input input-sm w-24"
						min={20}
						max={100}
						onchange={(e) => {
							config[k] = e.currentTarget.value
							buildMap()
						}} />
				{/if}
			</div>
		{/each}
	</div>
{/snippet}
