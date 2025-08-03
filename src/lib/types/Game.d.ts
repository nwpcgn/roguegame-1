export interface GameT {
	name: string
	gridStyle: string
	lock: LockT
	assets?: AssetsT[] | null
	opponents?: FighterT[] | null
	player: PlayerT
	grid: GridT
	dungeon: DungeonMap
	msg: Note
}
export interface LockT {
	render: boolean
	keys: boolean
}
export interface AssetsT {
	id: string
	name: string
	type: string
	value: number
}
export interface FighterT {
	id: string
	name: string
	info: string
	health: number
	maxHealth: number
	attacks?: AttacksT[] | null
}
export interface AttacksT {
	name: string
	dice: string
	damage: number
	description: string
}
export interface PlayerT {
	level: number
	name: string
	fighter?: FighterT[] | null
	inventory?: AssetsT[] | null
}
export interface GridT {
	width: number
	height: number
	size: number
	type: string
}
export interface DungeonMap {
	map?: (string[] | null)[] | null
	rooms?: RoomsT[] | null
	items?: string[] | null
	freeCells?: string[] | null
	enemys?: string[] | null
	position: PositionT
	corridors?: CorridorsT[] | null
	outside?: string[] | null
}
export interface RoomsT {
	x1: number
	y1: number
	x2: number
	y2: number
	doors?: PositionT[] | null
	centerX: number
	centerY: number
	roomId: number
}
export interface PositionT {
	x: number
	y: number
}
export interface CorridorsT {
	_startX: number
	_startY: number
	_endX: number
	_endY: number
	_endsWithAWall: boolean
	corrId: number
}
export interface Note {
	title: string
	type: string
	text: string
	isOpen: boolean
	isReady: boolean
}
/*
export {
	GameT,LockT,AssetsT,FighterT,AttacksT,PlayerT,DungeonMap,RoomsT,PositionT,CorridorsT,Note
}
 */
