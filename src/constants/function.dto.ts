import { ICoordonateAdventurer, ITileAdventurer } from "./tileAdventurer.dto"
import { ICoordonateTreasure } from "./tileTreasure.dto"

export interface IUniqueIdentifier {
    uuid: string,
}

export interface IDirection {
    direction: 'S' | 'N' | 'O' | 'E'
}

export interface IType {
    type: "plaine" | 'montagne' | 'aventurier' | 'treasure',
}

export interface ISize {
    x: number,
    y: number,
}

export interface ICoordonate {
    x: number,
    y: number,
}

export interface IMove {
    move: string
    adventurer: ITileAdventurer
}


export interface ITileBase extends ICoordonate, IType {
    isBlocking: boolean,
}

export interface ILineParser {
    carte: ISize | null,
    treasure: ICoordonateTreasure[],
    montagne: ICoordonate[],
    aventurier: ICoordonateAdventurer[],
}