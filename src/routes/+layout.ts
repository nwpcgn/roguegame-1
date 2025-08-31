import type { LayoutLoad } from './$types'

export const load = (async () => {
	return {
		nav: [
			{
				slug: 'start',
				name: 'Lobby',
				href: '/',
				icon: 'nwp-home',
				hidden: false
			},
			{
				slug: 'game',
				name: 'Game',
				href: '/game',
				icon: 'nwp-game',
				hidden: false
			},
			{
				slug: 'editor',
				name: 'Editor',
				href: '/editor',
				icon: 'nwp-options',
				hidden: false
			}
		]
	}
}) satisfies LayoutLoad
