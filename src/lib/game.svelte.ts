import { goto } from '$app/navigation'
import generateMap from './createMap'
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
class Config {
	#type: string = $state('Digger')
	#cols: number = $state(30)
	#rows: number = $state(30)
	#gridSize: number = $state(20)
	#tileSize: number = $state(32)
	constructor(
		type = 'Digger',
		cols = 30,
		rows = 30,
		gridSize = 20,
		tileSize = 32
	) {
		this.#type = type
		this.#cols = cols
		this.#rows = rows
		this.#gridSize = gridSize
		this.#tileSize = tileSize
	}
	stateObj() {
		return {
			type: this.#type,
			cols: this.#cols,
			rows: this.#rows,
			gridSize: this.#gridSize,
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
	get gridSize() {
		return this.#gridSize
	}
	set gridSize(value) {
		this.#gridSize = value
	}
	get tileSize() {
		return this.#tileSize
	}
	set tileSize(value) {
		this.#tileSize = value
	}
}

export let config = new Config('Digger', 30, 30, 32, 32)

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
		// console.log('created!', this.stateObj())
	}

	stateObj() {
		return {
			rooms: this.rooms.length,
			corridors: this.corridors.length,
			freeCells: this.freeCells.length
		}
	}
}

export let dungeon = new dungeonMap()

class Player {
	#position: Position = $state({
		x: 0,
		y: 0
	})

	get position() {
		return this.#position
	}

	set position(value: Position) {
		this.#position = { ...this.#position, ...value }
	}

	stateObj() {
		return {
			position: `${this.#position.x}/${this.#position.y}`
		}
	}
}

export let player = new Player()

class Frame {
	#frameW: number = $state(512)
	#frameH: number = $state(512)
	#camX: number = $state(0)
	#camY: number = $state(0)
	#camW: number = $state(512)
	#camH: number = $state(512)
	stateObj() {
		return {
			size: `${this.#camW}/${this.#camH}`,
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
	get camW() {
		return this.#camW
	}
	set camW(value = 0) {
		this.#camW = value
	}
	get camH() {
		return this.#camH
	}
	set camH(value = 0) {
		this.#camH = value
	}
}
export let frame = new Frame()

export const buildMap = () => {
	goto('#/game')
	dungeon.create()

	const randomItem =
		dungeon.freeCells[Math.floor(Math.random() * dungeon.freeCells.length)]
	const [x, y] = randomItem.split(',').map(Number)
	player.position = { x, y }
}

export const openConfig = () => goto('#/game/config')
export const openPlayer = () => goto('#/game/player')
