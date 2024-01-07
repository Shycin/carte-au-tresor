import { ICoordonate, IDirection, ITileBase, IUniqueIdentifier } from "./function.dto";
import { ITreasure } from "./tileTreasure.dto";

interface ISequentageAdventurer {
    sequentageToDo: string[],
}
export interface IAdventurer extends IDirection {
    name: string,
    move: string,
}
export interface ICoordonateAdventurer extends ICoordonate, IAdventurer { }
export interface ITileAdventurer extends ITileBase, IAdventurer, ITreasure, ISequentageAdventurer, IUniqueIdentifier { }