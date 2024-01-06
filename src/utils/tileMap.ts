import { settings } from "../constants/settings";
import { IAdventurer, ICoordonate, ISize, ITileAdventurer, ITileBase, ITileTreasure, ITreasure } from "../constants/function.dto";

export function tileMap({ x, y, isBlocking, type }: ITileBase) {
    return {
        x,
        y,
        isBlocking,
        type
    }
}

export const isMoveCorrect = (move: string) => !!settings.correctMove.find((eachMove) => move.split('').includes(eachMove))

export const isAxisCorrect = ({ x, y }: ISize) => (x >= 0 && Number.isInteger(x)) && (y >= 0 && Number.isInteger(y))
export const isTreasure = ({ x, y, treasureCount }: ICoordonate & ITreasure) => isAxisCorrect({ x, y }) && treasureCount > 0
export const isAdventurer = ({ x, y, name, direction, move }: ICoordonate & IAdventurer) => isAxisCorrect({ x, y }) && name.length > 0 && direction && move

export const nextCase = ({ currentPosition, direction }: { currentPosition: { x: number, y: number }, direction: 'S' | 'N' | 'O' | 'E' }) => {
    const valueInteger = direction === "S" || direction === "E" ? 1 : (direction === "N" || direction === "O" ? -1 : null)

    if (valueInteger)
        direction === "N" || direction === "S" ? currentPosition.y += valueInteger : (direction === "O" || direction === "E" ? currentPosition.x += valueInteger : null)

    return currentPosition

}

