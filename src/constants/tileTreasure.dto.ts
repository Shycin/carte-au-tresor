import { ICoordonate, ITileBase } from "./function.dto";

export interface ITreasure {
    treasureCount: number
}
export interface ICoordonateTreasure extends ICoordonate, ITreasure { }
export interface ITileTreasure extends ITileBase, ITreasure { }

