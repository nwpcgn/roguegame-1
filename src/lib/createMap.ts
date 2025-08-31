import * as ROT from 'rot-js'

export interface Generator {
	map: string[][]
	rooms: Room[]
	freeCells: string[]
	corridors: Corridor[]
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
	const rooms: Room = []
	const corridors: Corridor[] = []

	const digCallback = (x, y, value) => {
		map[y][x] = value ? '#' : '.'
		const key = `${x},${y}`
		if (value) return

		freeCells.push(key)
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

	digger.create(digCallback)
	createRooms()

	return {
		map,
		rooms,
		freeCells,
		corridors
	}
}
export default generateMap
