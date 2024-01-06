import { ICoordonate, ICoordonateAdventurer, ICoordonateTreasure, IMove, ISize, ITileAdventurer, ITileBase, ITileTreasure } from "../constants/function.dto"
import { settings } from "../constants/settings";
import { generateAdventurer, generateMountain, generatePlain, generateTreasure } from "../constants/typeTile";
import { isAdventurer, isAxisCorrect, isMoveCorrect, isTreasure, nextCase, tileMap } from "../utils/tileMap";


const initialize2DArray = (width: number, height: number) =>
    Array.from({ length: height }).map((y, indexY) =>
        Array.from({ length: width }).map((x, indexX) => tileMap(generatePlain({ x: indexX, y: indexY })))
    );


class Mapping {

    // valeurs pour définir les endroits accessiible ou non (ex: plaine = accessible // montagne = non accessible)
    //mapGame: ITileBase[][] = []
    mapSize: ISize = { x: 0, y: 0 }

    mapMountain: ITileBase[] = []
    mapTreasure: ITileTreasure[] = []
    mapAdventurer: ITileAdventurer[] = []

    mapOrderMoveAdventurer: ITileAdventurer[] = []


    constructor({ x, y }: ISize) {
        this.mapSize.x = x
        this.mapSize.y = y

        //this.mapGame = initialize2DArray(x, y)
    }




    isInMap({ x, y }: ICoordonate) {
        return x < this.mapSize.x && y < this.mapSize.y
    }

    getAllElementsInMap(): ITileBase[] {
        return [
            ...this.mapMountain,
            ...this.mapTreasure,
            ...this.mapAdventurer
        ]
    }

    getAllElementsIsBlockingInMap() {
        return this.getAllElementsInMap().filter((element) => element.isBlocking)
    }





    initMontagneTile(newTileMontagne: ICoordonate) {
        if (isAxisCorrect(newTileMontagne)) {

            const { x, y } = newTileMontagne
            const newMountain = generateMountain(newTileMontagne)

            this.mapMountain.push(newMountain)

            /*if (this.isInMap({ x, y }))
                this.mapGame[y][x] = newMountain as ITileBase*/
        }
    }

    initTreasureTile(newTileTreasure: ICoordonateTreasure) {
        if (isTreasure(newTileTreasure))
            this.mapTreasure.push(generateTreasure(newTileTreasure))
    }

    initAdventurerTile(newTileAdventurer: ICoordonateAdventurer) {
        if (isAdventurer(newTileAdventurer)) {
            const newMountain = generateAdventurer(newTileAdventurer)

            this.mapAdventurer.push(newMountain)
            this.mapOrderMoveAdventurer.push(newMountain)
        }

    }





    turnRigth(adventurer: ITileAdventurer): ITileAdventurer {
        const indexCoordinate = settings.correctCoordinate.findIndex((coordinate) => coordinate === adventurer.direction)

        indexCoordinate + 1 < (settings.correctCoordinate.length) ?
            adventurer.direction = settings.correctCoordinate[indexCoordinate + 1] as "N" | "O" | "E" | "S" :
            adventurer.direction = settings.correctCoordinate[0] as "N" | "O" | "E" | "S"

        return adventurer
    }

    turnLeft(adventurer: ITileAdventurer): ITileAdventurer {
        const indexCoordinate = settings.correctCoordinate.findIndex((coordinate) => coordinate === adventurer.direction)

        indexCoordinate - 1 >= 0 ?
            adventurer.direction = settings.correctCoordinate[indexCoordinate - 1] as "N" | "O" | "E" | "S" :
            adventurer.direction = settings.correctCoordinate[settings.correctCoordinate.length - 1] as "N" | "O" | "E" | "S"

        return adventurer
    }

    moveForward(adventurer: ITileAdventurer): ITileAdventurer {

        const { x, y, direction, uuid } = adventurer

        const newPosition = nextCase({ currentPosition: { x, y }, direction })
        const isValidNewPosition = this.isInMap({ x: newPosition.x, y: newPosition.y })


        if (isValidNewPosition) {

            const isBlocking = this.getAllElementsIsBlockingInMap().find((element) => element.x === newPosition.x && element.y === newPosition.y)
            const isTreasure = this.mapTreasure.find((element) => element.x === newPosition.x && element.y === newPosition.y && element.treasureCount > 0)

            if (!isBlocking) {

                const newAdventurer = {
                    ...adventurer,
                    x: newPosition.x,
                    y: newPosition.y,
                    treasureCount: isTreasure ? adventurer.treasureCount + 1 : adventurer.treasureCount
                }

                this.mapTreasure = this.mapTreasure.map((treasure) => {
                    if (treasure.x === newPosition.x && treasure.y === newPosition.y && treasure.treasureCount > 0)
                        return { ...treasure, treasureCount: treasure.treasureCount - 1 }

                    return treasure
                })

                return newAdventurer
            }
        }


        return adventurer
    }

    moveAdventure(action: IMove): ITileAdventurer {
        switch (action.move) {
            case "A":
                return this.moveForward(action.adventurer)
            case "G":
                return this.turnLeft(action.adventurer)
            case "D":
                return this.turnRigth(action.adventurer)
        }

        return action.adventurer
    }



    turnAdventure() {
        const orderAdventurerNeedToMove: ITileAdventurer[] = []

        this.mapOrderMoveAdventurer.forEach((adventurer) => {
            if (adventurer.sequentageToDo.length) {

                if (isMoveCorrect(adventurer.sequentageToDo[0] as unknown as string)) {
                    const newData = this.moveAdventure({
                        move: adventurer.sequentageToDo[0],
                        adventurer
                    })

                    const newAdventurer = {
                        ...newData,
                        sequentageToDo: adventurer.sequentageToDo.slice(1)
                    }

                    this.mapAdventurer = this.mapAdventurer.map((currentAdventurer) => {
                        if (currentAdventurer.uuid === adventurer.uuid)
                            return newAdventurer
                        return currentAdventurer
                    })


                    if (newAdventurer.sequentageToDo.length)
                        orderAdventurerNeedToMove.push(newAdventurer)
                }
            }
        })

        this.mapOrderMoveAdventurer = orderAdventurerNeedToMove
    }


    startAdventure() {
        const secure = this.mapOrderMoveAdventurer.reduce(function (prev, current) {
            return (prev && prev.sequentageToDo.length > current.sequentageToDo.length) ? prev : current
        }).sequentageToDo.length

        let compteurSafe = 0;
        while (this.mapOrderMoveAdventurer.length) {
            if (compteurSafe < secure) {
                this.turnAdventure()

                compteurSafe++;
            }
            else {
                break;
            }
        }
    }

}

export default Mapping
