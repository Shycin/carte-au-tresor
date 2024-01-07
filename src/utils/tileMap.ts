import { settings } from "../constants/settings";
import { ICoordonate, ISize, IDirection, ITileBase } from "../constants/function.dto";
import { IAdventurer, ICoordonateAdventurer, ITileAdventurer } from "../constants/tileAdventurer.dto";
import { ICoordonateTreasure, ITileTreasure, ITreasure } from "../constants/tileTreasure.dto";
import create_UUID from "./uuid";

//Validation si le "move" fais bien partie des actions autoriser pour se déplacer
export const isMoveCorrect = (move: string) => !!settings.correctMove.includes(move)

//Validation si la "direction" fais bien partie des coordonnées existante
export const isDirectionCorrect = ({ direction }: IDirection) => settings.correctCoordinate.includes(direction)

//Validation si "x" et "y" sont des entiers supérieurs ou égal à 0
export const isAxisCorrect = ({ x, y }: ISize) => (x >= 0 && Number.isInteger(x)) && (y >= 0 && Number.isInteger(y))

//Validation si "x" et "y" valide isAxisCorrect et que "treasureCount" est un entier supérieur à 0
export const isTreasure = ({ x, y, treasureCount }: ICoordonate & ITreasure) => isAxisCorrect({ x, y }) && treasureCount > 0 && Number.isInteger(treasureCount)

//Validation si "x" et "y" valide isAxisCorrect, name contient au moins un caractère pour le nommer, direction non null et move non null
export const isAdventurer = ({ x, y, name, direction, move }: ICoordonate & IAdventurer) => isAxisCorrect({ x, y }) && name.length > 0 && direction !== null && move !== null

//Fonction pour changer "x" et "y" en fonction du paramètre "direction"
export const nextCase = ({ x, y, direction }: { x: number, y: number, direction: 'S' | 'N' | 'O' | 'E' }) => {
    let valueInteger = null
    if (direction === "S" || direction === "E") valueInteger = 1
    if (direction === "N" || direction === "O") valueInteger = -1

    //Si la valeur à pu être initialiser avec 1 ou -1
    if (valueInteger) {
        //"Nord" ou "Sud" défini l'axe "y"
        if (direction === "N" || direction === "S") {
            y += valueInteger
        }
        //"Ouest" ou "Est" défini l'axe "x"
        else if (direction === "O" || direction === "E") {
            x += valueInteger
        }
    }

    return { x, y }

}


const mapMatcher = /C - (?<x>[0-9]+) - (?<y>[0-9]+)/
const mountainMatcher = /M - (?<x>[0-9]+) - (?<y>[0-9]+)/
const treasureMatcher = /T - (?<x>[0-9]+) - (?<y>[0-9]+) - (?<count>[0-9]+)/
const adventurerMatcher = /A - (?<name>\w+) - (?<x>[0-9]+) - (?<y>[0-9]+) - (?<direction>[NESO]) - (?<move>\w+)/


//Fonction qui permet de décomposer un string pour matcher avec une des règles regex précédente et retourner un objet formatter avec les bons nom de paramètres
export const detectTypeTile = (line: string): ICoordonate | ICoordonateAdventurer | ICoordonateTreasure | ISize | undefined => {

    const carte = line.match(mapMatcher)
    if (carte?.groups) {
        const { x, y } = carte.groups
        return { x: Number(x), y: Number(y) }
    }

    const mountain = line.match(mountainMatcher)
    if (mountain?.groups) {
        const { x, y } = mountain.groups
        return { x: Number(x), y: Number(y) }
    }

    const treasure = line.match(treasureMatcher)
    if (treasure?.groups) {
        const { x, y, count } = treasure.groups
        return { x: Number(x), y: Number(y), treasureCount: Number(count) }
    }

    const adventurer = line.match(adventurerMatcher)
    if (adventurer?.groups) {
        const { name, x, y, direction, move } = adventurer.groups
        return { name, x: Number(x), y: Number(y), direction: direction as 'S' | 'N' | 'O' | 'E', move }
    }

    return undefined
}

export const generateMountain = (params: ICoordonate): ITileBase => {
    return {
        ...params,
        isBlocking: true,
        type: "montagne"
    }

}

export const generateTreasure = (params: ICoordonateTreasure): ITileTreasure => {
    return {
        ...params,
        isBlocking: false,
        type: "treasure"
    }

}

export const generateAdventurer = (params: ICoordonateAdventurer): ITileAdventurer => {
    return {
        ...params,
        uuid: create_UUID(),
        isBlocking: true,
        type: "aventurier",
        treasureCount: 0,
        sequentageToDo: params.move.split('')
    }

}