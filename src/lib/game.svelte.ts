import generateMap from './createMap'
import getFighter from './getFighter'
export interface Corridor {
	_startX: number
	_startY: number
	_endX: number
	_endY: number
	_endsWithAWall: boolean
	corrId: number
}
export interface Room {
	x1: number
	y1: number
	x2: number
	y2: number
	doors: Position[]
	centerX: number
	centerY: number
	roomId: number
}
export interface Position {
	x: number
	y: number
}
export interface FighterT {
	name: string
	info: string
	hp: number
	maxHp: number
	level: number
	attacks?: Attacks[] | null
}
export interface Attacks {
	name: string
	dice: number
	damage: number
	description: string
}

class Config {
	#type: string = $state('Digger')
	#cols: number = $state(30)
	#rows: number = $state(30)
	#preSize: number = $state(20)
	#tileSize: number = $state(32)
	constructor(
		type = 'Digger',
		cols = 30,
		rows = 30,
		preSize = 20,
		tileSize = 32
	) {
		this.#type = type
		this.#cols = cols
		this.#rows = rows
		this.#preSize = preSize
		this.#tileSize = tileSize
	}
	stateObj() {
		return {
			type: this.#type,
			mapSize: `${this.#cols}x${this.#rows}`,
			tileSize: `${this.#tileSize}/${this.#preSize}`
		}
	}
	configObj() {
		return {
			type: this.#type,
			cols: this.#cols,
			rows: this.#rows,
			preSize: this.#preSize,
			tileSize: this.#tileSize
		}
	}
	get type() {
		return this.#type
	}
	set type(value) {
		this.#type = value
	}
	get cols() {
		return this.#cols
	}
	set cols(value) {
		this.#cols = value
	}
	get rows() {
		return this.#rows
	}
	set rows(value) {
		this.#rows = value
	}
	get preSize() {
		return this.#preSize
	}
	set preSize(value) {
		this.#preSize = value
	}
	get tileSize() {
		return this.#tileSize
	}
	set tileSize(value) {
		this.#tileSize = value
	}
}

export const config = new Config('Uniform', 40, 30, 10, 32)

class dungeonMap {
	map: string[][] = $state(null)
	rooms: Room[] = $state([])
	freeCells: string[] = $state([])
	corridors: Corridor[] = $state([])

	constructor() {
		this.map = Array.from({ length: config.rows }, () =>
			Array(config.cols).fill('#')
		)
	}

	create() {
		const data = generateMap(config.cols, config.rows, config.type)
		this.map = data.map
		this.rooms = data.rooms
		this.corridors = data.corridors
		this.freeCells = data.freeCells
		// console.log(JSON.stringify(data.freeCells))
		// console.log(this.getCell(), this.getCell(), this.getCell())
	}

	removeCell(cell: string) {
		this.freeCells = this.freeCells.filter((c) => c !== cell)
	}
	getCell() {
		const randomItem: string =
			this.freeCells[Math.floor(Math.random() * this.freeCells.length)]
		return randomItem
	}

	stateObj() {
		return {
			rooms: this.rooms.length,
			corridors: this.corridors.length,
			freeCells: this.freeCells.length
		}
	}
}

export const dungeon = new dungeonMap()

class Fighter {
	name: string = $state()
	info: string = $state()
	hp: number = $state()
	maxHp: number = $state()
	level: number = $state()
	attacks: Attacks[] = $state([])

	constructor(
		name: string,
		info: string,
		maxHp: number,
		level: number,
		attacks: Attacks[]
	) {
		this.name = name
		this.info = info
		this.maxHp = maxHp
		this.level = level
		this.attacks = attacks
		this.hp = this.maxHp
	}

	stateObj() {
		return {
			name: this.name,
			info: this.info,
			hp: `${this.hp}/${this.maxHp}`,
			level: this.level,
			attacks: this.attacks
		}
	}
}

class Player {
	#position: Position = $state({
		x: 0,
		y: 0
	})
	hero: FighterT = $state(null)

	constructor() {
		this.init()
	}

	init() {
		const data = getFighter()
		this.hero = new Fighter(
			data.name,
			data.info,
			data.maxHp,
			data.level,
			data.attacks
		)
	}

	get position() {
		return this.#position
	}

	set position(value: Position) {
		this.#position = { ...this.#position, ...value }
	}

	stateObj() {
		return {
			name: this.hero?.name,
			level: this.hero?.level,
			hp: `${this.hero?.hp}/${this.hero?.maxHp}`,
			position: `${this.#position.x}/${this.#position.y}`
		}
	}
}

export const player = new Player()

class Frame {
	#frameW: number = $state(512)
	#frameH: number = $state(512)
	#camX: number = $state(0)
	#camY: number = $state(0)
	camW: number = $state(512)
	camH: number = $state(512)
	canvasView: boolean = $state(true)
	toggleView() {
		this.canvasView = !this.canvasView
	}
	stateObj() {
		return {
			render: this.canvasView ? 'Canvas' : 'HTML',
			camSize: `${this.camW}/${this.camH}`,
			offset: `${this.#camX}/${this.#camY}`
		}
	}

	get frameW() {
		return this.#frameW
	}
	set frameW(value: number = 0) {
		this.#frameW = value
	}
	get frameH() {
		return this.#frameH
	}
	set frameH(value: number = 0) {
		this.#frameH = value
	}
	get camX() {
		return this.#camX
	}
	set camX(value: number = 0) {
		this.#camX = value
	}
	get camY() {
		return this.#camY
	}
	set camY(value: number = 0) {
		this.#camY = value
	}

	setCamSize(value = 512) {
		this.camH = value
		this.camW = value
	}
}
export const frame = new Frame()

export const buildMap = () => {
	dungeon.create()

	const x = dungeon.rooms[0]?.centerX
	const y = dungeon.rooms[0]?.centerY
	const key = `${x},${y}`
	console.log(dungeon.freeCells.length)
	dungeon.removeCell(key)
	console.log(dungeon.freeCells.length)
	// const randomItem =
	// 	dungeon.freeCells[Math.floor(Math.random() * dungeon.freeCells.length)]
	// const [x, y] = randomItem.split(',').map(Number)
	player.position = { x, y }
}
