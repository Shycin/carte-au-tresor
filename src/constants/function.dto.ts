interface IUniqueIdentifier {
    uuid: string,
}

export interface IMove {
    move: string
    adventurer: ITileAdventurer
}

export interface IDirection {
    direction: 'S' | 'N' | 'O' | 'E'
}

export interface ISize {
    x: number,
    y: number,
}


export interface ICoordonate {
    x: number,
    y: number,
}


export interface ITileBase extends ICoordonate {
    type: "plaine" | 'montagne' | 'aventurier' | 'treasure',
    isBlocking: boolean,
}

export interface ITreasure {
    treasureCount: number
}
export interface ICoordonateTreasure extends ICoordonate, ITreasure { }
export interface ITileTreasure extends ITileBase, ITreasure { }


interface ISequentageAdventurer {
    sequentageToDo: string[],
}
export interface IAdventurer extends IDirection {
    name: string,
    move: string,
}
export interface ICoordonateAdventurer extends ICoordonate, IAdventurer { }
export interface ITileAdventurer extends ITileBase, IAdventurer, ITreasure, ISequentageAdventurer, IUniqueIdentifier { }


export interface ITileCombine {
    adventurer: ITileAdventurer,
    treasure: ITileTreasure,
}


export interface ILineParser {
    carte: ISize | null,
    treasure: ICoordonateTreasure[],
    montagne: ICoordonate[],
    aventurier: ICoordonateAdventurer[],
}