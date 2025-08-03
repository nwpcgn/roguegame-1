import * as ROT from 'rot-js'
const randNum = (min = 0, max = 1) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}

export interface Generator {
	map: string[][]
	rooms: Room[]
	items: string[]
	freeCells: string[]
	enemys: string[]
	position: Position
	corridors: Corridor[]
	type: string
	width: number
	height: number
	outside: string[]
}

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

export function generateMap(
	width = 20,
	height = 20,
	type = 'Uniform'
): Generator {
	const digger = new ROT.Map[type](width, height)
	const map: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(' ')
	)
	let freeCells: string[] = []
	const zeroCells: string[] = []
	const outside: string[] = []
	const rooms: Room = []
	const corridors: Corridor[] = []
	const items: string[] = []
	const enemys: string[] = []
	let position: Position = { x: 0, y: 0 }

	const digCallback = (x, y, value) => {
		map[y][x] = value ? '#' : '.'
		const key = `${x},${y}`
		if (value) {
			zeroCells.push(key)
		} else {
			freeCells.push(key)
		}
	}

	const createRooms = () => {
		digger.getRooms().forEach((room, roomId) => {
			const result = convertRoom(room)
			const [centerX, centerY] = room.getCenter()
			rooms.push({ ...result, centerX, centerY, roomId })
		})

		digger.getCorridors().forEach((corr, corrId) => {
			corridors.push({ ...corr, corrId })
		})
	}
	const convertRoom = (r) => {
		const doors = Object.keys(r._doors).map((key) => {
			const [x, y] = key.split(',').map(Number)
			return { x, y }
		})

		doors.forEach(({ x, y }) => {
			map[y][x] = 'D'
			freeCells = freeCells.filter((cell) => cell !== `${x},${y}`)
		})

		for (let y = r._y1; y <= r._y2; y++) {
			for (let x = r._x1; x <= r._x2; x++) {
				map[y][x] = '_'
			}
		}

		return {
			x1: r._x1,
			y1: r._y1,
			x2: r._x2,
			y2: r._y2,
			doors
		}
	}
	const generateBoxes = (freeCells) => {
		const length1 = Math.round(freeCells.length * 0.1)
		for (let i = 0; i < length1; i++) {
			const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
			const key = freeCells.splice(index, 1)[0]
			// const [x, y] = key.split(',')
			// items.push({ x: parseInt(x), y: parseInt(y), slug: `${i}` })
			items.push(key)
		}
		const length2 = randNum(1, 3)
		for (let i = 0; i < length2; i++) {
			const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
			const key = freeCells.splice(index, 1)[0]
			// const [x, y] = key.split(',')
			// enemys.push({ x: parseInt(x), y: parseInt(y), slug: `${i}` })
			enemys.push(key)
		}
		for (let i = 0; i < 10; i++) {
			const index = Math.floor(ROT.RNG.getUniform() * zeroCells.length)
			const key = zeroCells.splice(index, 1)[0]
			// const [x, y] = key.split(',')
			// enemys.push({ x: parseInt(x), y: parseInt(y), slug: `${i}` })
			outside.push(key)
		}
	}

	const placeFighter = (freeCells) => {
		const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
		const key = freeCells.splice(index, 1)[0]
		const [x, y] = key.split(',')
		position = { x: parseInt(x), y: parseInt(y) }
	}

	digger.create(digCallback)
	createRooms()
	generateBoxes(freeCells)
	placeFighter(freeCells)

	return {
		map,
		rooms,
		items,
		freeCells,
		enemys,
		position,
		corridors,
		type,
		width,
		height,
		outside
	}
}
export default generateMap
