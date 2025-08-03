type Attacks = {
	name: string
	dice: string
	damage: number
	description: string
}

type Fighter = {
	name: string
	info: string
	health: number
	maxHealth: number
	attacks: Attacks[]
}

const attackPool: Attacks[] = [
	{
		name: 'Shield Bash',
		dice: '1d6',
		damage: 4,
		description: 'You are trying to bash the opponent away with your shield.'
	},
	{
		name: 'Flame Slash',
		dice: '1d8',
		damage: 5,
		description: 'You ignite your blade and slash with burning force.'
	},
	{
		name: 'Piercing Shot',
		dice: '1d6',
		damage: 6,
		description: 'You fire a precise arrow that pierces armor.'
	},
	{
		name: 'Thunder Fist',
		dice: '1d4',
		damage: 8,
		description: 'You charge your fist with lightning and strike down.'
	},
	{
		name: 'Poison Fang',
		dice: '1d4',
		damage: 5,
		description: 'You bite with venomous teeth, weakening the enemy.'
	},
	{
		name: 'Whirlwind',
		dice: '1d8',
		damage: 3,
		description: 'You spin with full force and strike all nearby enemies.'
	},
	{
		name: 'Shadow Stab',
		dice: '1d6',
		damage: 6,
		description: 'You vanish briefly and strike from behind.'
	},
	{
		name: 'Ice Spear',
		dice: '1d8',
		damage: 5,
		description: 'You hurl a spear of ice that slows the enemy.'
	},
	{
		name: 'Holy Light',
		dice: '1d6',
		damage: 4,
		description: 'You blast the target with pure radiant energy.'
	},
	{
		name: 'Fireball',
		dice: '1d9',
		damage: 6,
		description: 'You launch a blazing fireball that explodes on impact.'
	}
]

const names = [
	'Dwarf Knight',
	'Orc Raider',
	'Elf Archer',
	'Human Mage',
	'Goblin Trickster',
	'Undead Warrior',
	'Lizard Gladiator',
	'Dark Paladin',
	'Minotaur Brute',
	'Troll Berserker'
]

const descriptions = [
	'A sturdy warrior with a big shield.',
	'Fast and brutal, strikes before you blink.',
	'Wise and quiet, but deadly with magic.',
	'Agile and elusive, a true survivalist.',
	'Cursed by the past, fighting for redemption.',
	'Fueled by rage, knows no fear.',
	'Master of flame and fury.',
	'A silent hunter from the deep woods.',
	'Magically enhanced with ancient power.',
	'Driven by instinct and hunger for battle.'
]

function uuidv4() {
	return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
		(
			+c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
		).toString(16)
	)
}

export function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomAttacks(count = 2): Attack[] {
	const pool = [...attackPool]
	const result: Attack[] = []
	for (let i = 0; i < count && pool.length > 0; i++) {
		const index = Math.floor(Math.random() * pool.length)
		result.push(pool.splice(index, 1)[0])
	}
	return result
}

export function getRandomFighter(attCount = 0): Fighter {
	const i = Math.floor(Math.random() * names.length)
	const name = names[i]
	const info = descriptions[i]
	const id = uuidv4()

	const maxHealth = getRandomInt(30, 40)

	return {
		id,
		name,
		info,
		health: maxHealth,
		maxHealth,
		attacks: getRandomAttacks(attCount ? attCount : getRandomInt(1, 3))
	}
}
export default getRandomFighter
