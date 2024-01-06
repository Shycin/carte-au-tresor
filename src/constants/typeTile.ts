import create_UUID from "../utils/uuid"
import { ICoordonate, ICoordonateAdventurer, ICoordonateTreasure, ITileAdventurer, ITileBase, ITileTreasure } from "./function.dto"

export const generatePlain = (params: ICoordonate): ITileBase => {
    return {
        ...params,
        isBlocking: false,
        type: "plaine"
    }

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