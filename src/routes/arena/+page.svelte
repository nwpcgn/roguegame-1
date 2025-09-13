<script lang="ts">
	import { player } from '$lib/game.svelte.ts'
</script>

<section class="nwp page center">
	<div class="card-border heading-2 card w-sm bg-base-100/75">
		<div class="card-body">
			<h2 class="text-4xl font-bold">Hero</h2>
			{@render configCard()}
			<div class="card-actions justify-end">
				<a href="#/" class="btn btn-neutral">Close</a>
			</div>
		</div>
	</div>
</section>

{#snippet configCard()}
	<div class="flex flex-col gap-2 text-lg">
		{#each Object.entries(player.hero.stateObj()) as [k, v] (k)}
			{#if typeof v == 'string' || typeof v == 'number'}
				<div class="flex items-center gap-4">
					<span class="flex-1 font-semibold capitalize">{k}</span>
					<span class="badge truncate badge-soft badge-info">{v}</span>
				</div>
			{:else if Array.isArray(v)}
				<div class="flex items-center gap-4">
					<span class="flex-1 font-semibold capitalize">Attacks</span>
					<span class="badge badge-soft badge-error">{v.length}</span>
				</div>
				{#each v as { name, dice, damage }, id (id)}
					<div class="flex items-center gap-2">
						<span class="flex-1 text-sm font-semibold capitalize opacity-70"
							>{name}</span>

						<span class="badge badge-soft badge-sm badge-info">{dice}</span>
						<span class="badge badge-soft badge-sm badge-info">{damage}</span>
					</div>
				{/each}
			{/if}
		{/each}
	</div>
{/snippet}
