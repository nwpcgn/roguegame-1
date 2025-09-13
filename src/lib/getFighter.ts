type Attacks = {
	name: string
	dice: number
	damage: number
	description: string
}

type Fighter = {
	id: string
	name: string
	info: string
	hp: number
	maxHp: number
	level: number
	attacks: Attacks[]
}
const attackCount = 2
const attackPool: Attacks[] = [
	{
		name: 'Shield Bash',
		dice: 3,
		damage: 4,
		description: 'You are trying to bash the opponent away with your shield.'
	},
	{
		name: 'Flame Slash',
		dice: 4,
		damage: 5,
		description: 'You ignite your blade and slash with burning force.'
	},
	{
		name: 'Piercing Shot',
		dice: 5,
		damage: 6,
		description: 'You fire a precise arrow that pierces armor.'
	},
	{
		name: 'Thunder Fist',
		dice: 3,
		damage: 8,
		description: 'You charge your fist with lightning and strike down.'
	},
	{
		name: 'Poison Fang',
		dice: 6,
		damage: 5,
		description: 'You bite with venomous teeth weakening the enemy.'
	},
	{
		name: 'Whirlwind',
		dice: 7,
		damage: 3,
		description: 'You spin with full force and strike all nearby enemies.'
	},
	{
		name: 'Shadow Stab',
		dice: 4,
		damage: 6,
		description: 'You vanish briefly and strike from behind.'
	},
	{
		name: 'Ice Spear',
		dice: 9,
		damage: 5,
		description: 'You hurl a spear of ice that slows the enemy.'
	},
	{
		name: 'Holy Light',
		dice: 6,
		damage: 4,
		description: 'You blast the target with pure radiant energy.'
	},
	{
		name: 'Crushing Blow',
		dice: 7,
		damage: 7,
		description: 'You deliver a brutal overhead strike.'
	},
	{
		name: 'Quick Jab',
		dice: 3,
		damage: 3,
		description: 'You attack swiftly before the enemy can react.'
	},
	{
		name: 'Earth Spike',
		dice: 8,
		damage: 6,
		description: 'You summon a rock spike from the ground below the foe.'
	},
	{
		name: 'Dark Pulse',
		dice: 4,
		damage: 4,
		description: 'You unleash a pulse of dark energy.'
	},
	{
		name: 'Burning Grip',
		dice: 7,
		damage: 6,
		description: 'You grab the enemy with a fiery hand.'
	},
	{
		name: 'Wind Cutter',
		dice: 4,
		damage: 5,
		description: 'You launch a blade of compressed air at high speed.'
	},
	{
		name: 'Soul Drain',
		dice: 9,
		damage: 4,
		description: "You drain part of the enemy's essence to heal yourself."
	},
	{
		name: 'Frost Nova',
		dice: 3,
		damage: 5,
		description: 'You release a freezing wave that slows all enemies nearby.'
	},
	{
		name: 'Venom Dart',
		dice: 6,
		damage: 4,
		description: 'You throw a dart coated with fast-acting poison.'
	},
	{
		name: 'Fireball',
		dice: 4,
		damage: 6,
		description: 'You launch a blazing fireball that explodes on impact.'
	},
	{
		name: 'Heavy Kick',
		dice: 4,
		damage: 5,
		description: 'You slam your foot into the enemy with great force.'
	}
]

const names = [
	'Cypher',
	'Fade',
	'Gekko',
	'Harbor',
	'Jett',
	'Killjoy',
	'Mew',
	'Neon',
	'Omen',
	'Phoenix',
	'Raze',
	'Reyna',
	'Sage',
	'Skye'
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

export function getRandomAttacks(count = 1): Attack[] {
	const pool = [...attackPool]
	const result: Attack[] = []
	for (let i = 0; i < count && pool.length > 0; i++) {
		const index = Math.floor(Math.random() * pool.length)
		result.push(pool.splice(index, 1)[0])
	}
	return result
}

export function getFighter(): Fighter {
	const i = Math.floor(Math.random() * names.length)
	const name = names[i]
	const info = descriptions[i]
	const id = uuidv4()
	const maxHp = getRandomInt(30, 40)
	const level = getRandomInt(2, 3)
	return {
		id,
		name,
		info,
		hp: maxHp,
		maxHp,
		level,
		attacks: getRandomAttacks(attackCount)
	}
}
export default getFighter
