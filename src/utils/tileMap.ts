import { settings } from "../constants/settings";
import { IAdventurer, ICoordonate, ISize, ITreasure, IDirection } from "../constants/function.dto";

export const isMoveCorrect = (move: string) => !!settings.correctMove.includes(move)

export const isDirectionCorrect = ({ direction }: IDirection) => settings.correctCoordinate.includes(direction)
export const isAxisCorrect = ({ x, y }: ISize) => (x >= 0 && Number.isInteger(x)) && (y >= 0 && Number.isInteger(y))
export const isTreasure = ({ x, y, treasureCount }: ICoordonate & ITreasure) => isAxisCorrect({ x, y }) && treasureCount > 0 && Number.isInteger(treasureCount)
export const isAdventurer = ({ x, y, name, direction, move }: ICoordonate & IAdventurer) => isAxisCorrect({ x, y }) && name.length > 0 && direction !== null && move !== null

export const nextCase = ({ x, y, direction }: { x: number, y: number, direction: 'S' | 'N' | 'O' | 'E' }) => {
    const valueInteger = direction === "S" || direction === "E" ? 1 : (direction === "N" || direction === "O" ? -1 : null)

    if (valueInteger)
        direction === "N" || direction === "S" ? y += valueInteger : (direction === "O" || direction === "E" ? x += valueInteger : null)

    return { x, y }

}

