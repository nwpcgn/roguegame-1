import type {
	GameT,
	AssetsT,
	FighterT,
	AttacksT,
	PlayerT,
	DungeonMap,
	RoomsT,
	PositionT,
	CorridorsT
} from './types/Game'
import getRandomFighter from './game/generateFighter'
import generateMap from './game/generateMap'
import gameData from './game/data/assets.json'
import { sleep, uuid } from '.'

class Item {
	constructor({ id, name, type, value }) {
		this.id = id
		this.name = name
		this.type = type
		this.value = value
	}
}

class Fighter {
	id: string = $state('')
	name: string = $state('')
	info: string = $state()
	health: number = $state()
	maxHealth: number = $state()
	attacks: AttacksT[] = $state([])
	constructor({ name, info, health, maxHealth, attacks }) {
		this.name = name
		this.info = info
		this.health = health
		this.maxHealth = maxHealth
		this.attacks = [...attacks]
	}
}

class Player {
	name: string = $state('')
	level: number = $state(0)
	hero: FighterT = $state(null)
	inventory: AssetsT[] = $state([])
	constructor(name: string, hero: FighterT) {
		this.name = name
		this.hero = new Fighter(hero)
		this.level = 1
		this.inventory = [
			new Item({
				id: uuid(),
				name: 'Elixir of Time',
				type: 'potion',
				value: 7
			})
		]
	}
}

class Dungeon {
	map: string[][] | null = $state()
	items: string[] = $state([])
	enemys: string[] = $state([])
	outside: string[] = $state([])
	freeCells: string[] = $state([])
	corridors: CorridorsT[] = $state([])
	rooms: RoomsT[] = $state([])
	position: PositionT = $state({
		x: 0,
		y: 0
	})
	generate(width = 40, height = 40, type = 'Uniform') {
		const data = generateMap(width, height, type)
		console.log({ data })
		this.map = data.map
		this.rooms = data.rooms
		this.items = data.items
		console.log(data.items)
		this.freeCells = data.freeCells
		this.enemys = data.enemys
		this.position = data.position
	}
	updatePosition(obj: Position) {
		this.position = obj
	}

	removeItem(x: number, y: number) {
		const key = `${x},${y}`
		this.items = this.items.filter((el) => el !== key)
		return this.items
	}
	isItem(x: number, y: number) {
		const key = `${x},${y}`
		const res = this.items.find((el) => el === key)
		return res
	}
}

class Game {
	name: string = $state('Dungerue Manner')
	grid = $state({ width: 25, height: 25, size: 20, type: 'Digger' })
	assets: AssetsT[] = $state([])
	dungeon: DungeonMap = new Dungeon()
	player: PlayerT = $state(null)
	opponents: FighterT[] = $state([])
	gridStyle: string = $derived(
		`--grid-cols: ${this.grid.width};--grid-rows: ${this.grid.height};--grid-size: ${this.grid.size}px;`
	)
	constructor(name = '') {
		this.name = name
		this.assets = this.shuffle(gameData?.loot)
		this.createMap()
		this.createChars()
	}
	createMap() {
		this.dungeon.generate(this.grid.width, this.grid.height, this.grid.type)
	}
	updateGrid(config = {}) {
		this.grid = { ...this.grid, ...config }
	}

	createChars() {
		const p = getRandomFighter(3)
		this.player = new Player('Caryn Dynasty', p)

		for (let index = 0; index < 10; index++) {
			const e = getRandomFighter(2)
			this.opponents.push(new Fighter(e))
		}
	}

	updateHero(obj = { x: 0, y: 0 }) {
		this.dungeon.updatePosition(obj)
	}
	isPlayer(x: number, y: number) {
		return this.dungeon.position.x == x && this.dungeon.position.y == y
	}
	inDistance(x1: number, y1: number, dist = 2.8) {
		const rad = Math.hypot(
			this.dungeon.position.x - x1,
			this.dungeon.position.y - y1
		)
		return rad < dist
	}
	addInventar() {
		const newInv = { ...this.assets.shift(), id: uuid() }
		this.player.inventory.push(new Item(newInv))
		return newInv
	}
	shuffle(array) {
		const copy = [...array]
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[copy[i], copy[j]] = [copy[j], copy[i]]
		}
		return copy
	}
}

export const game: GameT = new Game('Dungerue Manner', gameData)
