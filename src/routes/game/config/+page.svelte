<script lang="ts">
	import { config } from '$lib/game.svelte.ts'
</script>

<section class="nwp page center">
	<div class="card-border card w-sm bg-base-100/75">
		<div class="card-body">
			<h2 class="card-title">Settings</h2>
			{@render configCard()}
			<div class="card-actions justify-end">
				<a href="#/game" class="btn">Close</a>
			</div>
		</div>
	</div>
</section>

{#snippet configCard()}
	<div class="flex flex-col gap-2">
		{#each Object.entries(config.stateObj()) as [k, v] (k)}
			<div class="flex items-center gap-4">
				<span class="flex-1 font-semibold capitalize">{k}</span>
				{#if k === 'type'}
					<select
						class="select w-32 select-sm"
						onchange={(e) => {
							config[k] = e.currentTarget.value
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
						class="input input-sm w-24"
						min={20}
						max={100}
						onchange={(e) => {
							config[k] = e.currentTarget.value
						}} />
				{/if}
			</div>
		{/each}
	</div>
{/snippet}
