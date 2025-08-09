<script>
	import { game } from './lib/game.svelte'

	const disp = [
		{
			slug: 'width',
			name: 'Width',
			icon: 'nwp-cols',
			group: 'options'
		},
		{
			slug: 'height',
			name: 'Height',
			icon: 'nwp-rows',
			group: 'options'
		},
		{
			slug: 'size',
			name: 'Size',
			icon: 'nwp-size',
			group: 'options'
		},
		{
			slug: 'generator',
			name: 'Type',
			icon: 'nwp-tag',
			group: 'options'
		},
		{
			slug: 'items',
			name: 'Items',
			icon: 'nwp-archive',
			group: 'dungeon'
		},
		{
			slug: 'enemys',
			name: 'Enemys',
			icon: 'nwp-enemy',
			group: 'dungeon'
		},
		{
			slug: 'position',
			name: 'Hero',
			icon: 'nwp-half',
			group: 'dungeon'
		},
		{
			slug: 'hero',
			name: 'Hero',
			icon: 'nwp-hero',
			group: 'hero'
		},
		{
			slug: 'hp',
			name: 'Hp',
			icon: 'nwp-user',
			group: 'hero'
		},
		{
			slug: 'stats',
			name: 'Stats',
			icon: 'nwp-bar',
			group: 'hero'
		},
		{
			slug: 'inventory',
			name: 'Items',
			icon: 'nwp-tiles',
			group: 'hero'
		}
	]
	const dispObj = Object.groupBy(disp, ({ group }) => group)
	const dispH = {
		options: { icon: 'nwp-settings', title: 'Options' },
		dungeon: { icon: 'nwp-map', title: 'Dungeon' },
		hero: { icon: 'nwp-story', title: 'Hero' }
	}
	let dispV = $derived({
		options: [
			game.grid.width,
			game.grid.height,
			game.grid.size,
			game.grid.type
		],
		dungeon: [
			game.dungeon.items?.length,
			game.dungeon.enemys?.length,
			`${game.dungeon.position.x}x${game.dungeon.position.y}`
		],
		hero: ['Mui', '30', 'ok', '2']
	})
</script>

<aside>
	<div class="px-2">
		{#each Object.entries(dispObj) as [k, v] (k)}
			<div>
				<h2 class="my-2 flex items-center gap-2">
					<span class=" text-xl font-bold">{dispH[k].title}</span>
				</h2>
				<div class="flex flex-col pl-2" style="--fs: 16px;">
					{#each v as { name, icon, slug }, i}
						<div class="flex items-center gap-1">
							{@render iconT(icon)}
							<small class="mr-2 flex-1">{name}</small>
							<span>{dispV[k]?.[i]}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</aside>

{#snippet iconT(name)}
	<svg class="nwp-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}
