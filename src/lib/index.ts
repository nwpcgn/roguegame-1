// place files you want to import through the `$lib` alias in this folder.
//@index('./x**/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)

//@endindex
export { default as Sprites } from './icons/sprites.svelte'

//@index('./utils/x*.js', (f, _) => `export { default as ${f.name} } from '${f.path}'`)

//@endindex
export { default as randNum } from './utils/randNum'
export { default as shuffle } from './utils/shuffle'
export { default as sleep } from './utils/sleep'
export { default as uuid } from './utils/uuid'
export const nav = [
	{
		slug: 'start',
		name: 'Lobby',
		href: '/',
		icon: 'nwp-home',
		hidden: false
	},
	{
		slug: 'map',
		name: 'Dungeon',
		href: '/v2',
		icon: 'nwp-game',
		hidden: false
	},
	{
		slug: 'settings',
		name: 'Arena',
		href: '/v3',
		icon: 'nwp-options',
		hidden: false
	}
]
