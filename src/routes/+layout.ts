import type { LayoutLoad } from './$types'

export const load = (async () => {
	return {
		nav: [
			{
				slug: 'start',
				href: '/',
				name: 'Lobby',
				icon: 'rpg-lobby',
				title: 'Darkwood Manner',
				type: 'page'
			},
			{
				slug: 'map',
				href: '/map',
				name: 'World',
				icon: 'rpg-map',
				title: 'Dungeon-Map',
				type: 'page'
			},
			{
				slug: 'arena',
				href: '/arena',
				name: 'Arena',
				icon: 'rpg-arena',
				title: 'Battleground',
				type: 'page'
			},
			{
				slug: 'settings',
				href: '/settings',
				name: 'Settings',
				icon: 'rpg-settings',
				title: 'Options',
				type: 'page'
			}
		]
	}
}) satisfies LayoutLoad
