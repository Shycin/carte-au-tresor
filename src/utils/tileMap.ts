import { settings } from "../constants/settings";
import { IAdventurer, ICoordonate, ISize, ITreasure, IDirection } from "../constants/function.dto";

export const isMoveCorrect = (move: string) => !!settings.correctMove.includes(move)

export const isDirectionCorrect = ({ direction }: IDirection) => settings.correctCoordinate.includes(direction)
export const isAxisCorrect = ({ x, y }: ISize) => (x >= 0 && Number.isInteger(x)) && (y >= 0 && Number.isInteger(y))
export const isTreasure = ({ x, y, treasureCount }: ICoordonate & ITreasure) => isAxisCorrect({ x, y }) && treasureCount > 0 && Number.isInteger(treasureCount)
export const isAdventurer = ({ x, y, name, direction, move }: ICoordonate & IAdventurer) => isAxisCorrect({ x, y }) && name.length > 0 && direction !== null && move !== null

export const nextCase = ({ x, y, direction }: { x: number, y: number, direction: 'S' | 'N' | 'O' | 'E' }) => {
    let valueInteger = null
    if (direction === "S" || direction === "E") valueInteger = 1
    if (direction === "N" || direction === "O") valueInteger = -1


    if (valueInteger) {
        if (direction === "N" || direction === "S") {
            y += valueInteger
        }
        else if (direction === "O" || direction === "E") {
            x += valueInteger
        }
    }

    return { x, y }

}

