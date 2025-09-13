const views = {
	start: {
		slug: 'start',
		name: 'Lobby',
		href: '/',
		icon: 'nwp-home',
		apiUrl: null
	},
	character: {
		slug: 'character',
		name: 'Character',
		href: '/character',
		icon: 'nwp-game',
		apiUrl: 'https://rickandmortyapi.com/api/character'
	},
	location: {
		slug: 'location',
		name: 'Location',
		href: '/location',
		icon: 'nwp-options',
		apiUrl: 'https://rickandmortyapi.com/api/location'
	},
	episode: {
		slug: 'episode',
		name: 'Episode',
		href: '/episode',
		icon: 'nwp-archive',
		apiUrl: 'https://rickandmortyapi.com/api/episode'
	}
}
export default views
