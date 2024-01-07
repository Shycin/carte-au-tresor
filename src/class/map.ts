import { ICoordonate, IMove, ISize, ITileBase } from "../constants/function.dto"
import { settings } from "../constants/settings";
import { ICoordonateAdventurer, ITileAdventurer } from "../constants/tileAdventurer.dto";
import { ICoordonateTreasure, ITileTreasure } from "../constants/tileTreasure.dto";
import { generateAdventurer, generateMountain, generateTreasure, isAdventurer, isAxisCorrect, isMoveCorrect, isTreasure, nextCase } from "../utils/tileMap";


class Mapping {

    private mapSize: ISize = { x: 0, y: 0 }

    private mapMountain: ITileBase[] = []
    private mapTreasure: ITileTreasure[] = []
    private mapAdventurer: ITileAdventurer[] = []

    private mapOrderMoveAdventurer: ITileAdventurer[] = []

    constructor({ x, y }: ISize) {
        this.mapSize.x = x
        this.mapSize.y = y
    }



    /** ------------------------ GETTER ------------------------ */

    //Getter de la taille de la carte de jeu
    get_MapSize() {
        return this.mapSize
    }

    //Getter du tableau des cases montagnes
    get_Mountains() {
        return this.mapMountain
    }

    //Getter du tableau des cases trésors
    get_Treasure() {
        return this.mapTreasure
    }

    //Getter du tableau des cases aventuriers
    get_Adventurer() {
        return this.mapAdventurer
    }

    //récupération de toutes les tuiles du jeu pouvant créer une condition particulière dans le jeu
    get_AllElementsInMap(): ITileBase[] | ITileTreasure[] | ITileAdventurer[] {
        return [
            ...this.mapMountain,
            ...this.mapTreasure,
            ...this.mapAdventurer
        ]
    }

    //Getter de toutes les tuiles caractérisé par le type bloquant, le joueur ne peut pas s'y rendre
    get_AllElementsIsBlockingInMap() {
        return this.get_AllElementsInMap().filter((element) => element.isBlocking)
    }




    /** ------------------------ SETTER ------------------------ */

    //ajout d'une case montagnes, vérification si il peut se trouver dans le tableau et que rien n'empêche sa création
    addMontagneTile(newTileMontagne: ICoordonate) {
        if (this.isInMap(newTileMontagne) && this.isInstantiable(newTileMontagne)) {
            const newMountain = generateMountain(newTileMontagne)
            this.mapMountain.push(newMountain)
        }
    }

    //ajout d'une case trésor, vérification si il peut se trouver dans le tableau, que c'est bien un trésor et que aucun trésor ne s'y trouve déjà
    addTreasureTile(newTileTreasure: ICoordonateTreasure) {
        if (this.isInMap(newTileTreasure) && isTreasure(newTileTreasure) && this.get_Treasure().find((treasure) => treasure.x === newTileTreasure.x && treasure.y === newTileTreasure.y && treasure.treasureCount > 0))
            this.mapTreasure.push(generateTreasure(newTileTreasure))
    }

    //ajout d'une case aventurier, vérification si il peut se trouver dans le tableau, que c'est bien un aventurier et que rien n'empêche sa création
    addAdventurerTile(newTileAdventurer: ICoordonateAdventurer) {
        if (this.isInMap(newTileAdventurer) && isAdventurer(newTileAdventurer) && this.isInstantiable(newTileAdventurer)) {
            const newAdventurer = generateAdventurer(newTileAdventurer)

            this.mapAdventurer.push(newAdventurer)

            //ajout au tableau mapOrderMoveAdventurer pour la gestion de l'ordre de paasage des aventurier
            this.mapOrderMoveAdventurer.push(newAdventurer)
        }
    }




    /** ------------------------ CHECKER ------------------------ */

    //vérification que les coordonnées x et y sont possible sur le tableau de jeu
    isInMap({ x, y }: ICoordonate) {
        return x < this.mapSize.x && y < this.mapSize.y && isAxisCorrect({ x, y })
    }

    //vérification que aux coordonnées en paramètre on peux ajouter une tuile sans que celle-ci soit bloqué 
    isInstantiable(coordinate: ICoordonate) {
        const { x, y } = coordinate
        return !this.get_AllElementsIsBlockingInMap().find((element) => element.x === x && element.y === y) && this.isInMap({ x: x, y: y })
    }





    /** ------------------------ ACTION ------------------------ */

    //action pour la suppression case trésor si celle-ci tombe à un compteur de 0
    cleanTreasureIfEmpty() {
        this.mapTreasure = this.mapTreasure.filter((treasure) => {
            return treasure.treasureCount > 0;
        });
    }

    //action qui permet d'incrémenter le compteur de trésor de l'aventurier, de diminuer le nombre de trésor sur la case et de supprimer la case trésor si le compteur descend à 0
    collectTreasureIfAvailable(nextAdventurer: ITileAdventurer): ITileAdventurer {
        //vérification si la prochaine case est une case trésor ou non
        const isTreasure = this.mapTreasure.find((element) => element.x === nextAdventurer.x && element.y === nextAdventurer.y && element.treasureCount > 0)

        if (isTreasure) {

            //changement du nombre de trésor sur la case
            this.mapTreasure = this.mapTreasure.map((treasure) => {
                if (treasure.x === isTreasure.x && treasure.y === isTreasure.y && treasure.treasureCount > 0)
                    return { ...treasure, treasureCount: treasure.treasureCount - 1 }

                return treasure
            })

            this.cleanTreasureIfEmpty()

            return {
                ...nextAdventurer,
                treasureCount: nextAdventurer.treasureCount + 1
            }
        }

        return nextAdventurer
    }

    //action pour changer le paramètre "direction" de l'aventurier en paramètre dans le sens horaire
    turnRigth(adventurer: ITileAdventurer): ITileAdventurer {
        //Trouve l'index actuel de la direction de l'aventurier
        const indexCoordinate = settings.correctCoordinate.findIndex((coordinate) => coordinate === adventurer.direction)

        //Si l'index + 1 n'est pas supérieur à la taille du tableau de direction, on récupère l'index suivant en ajoutant 1
        indexCoordinate + 1 < (settings.correctCoordinate.length) ?
            adventurer.direction = settings.correctCoordinate[indexCoordinate + 1] as "N" | "O" | "E" | "S" :
            adventurer.direction = settings.correctCoordinate[0] as "N" | "O" | "E" | "S"

        return adventurer
    }

    //action pour changer le paramètre "direction" de l'aventurier en paramètre dans le sens anti horaire
    turnLeft(adventurer: ITileAdventurer): ITileAdventurer {
        //Trouve l'index actuel de la direction de l'aventurier
        const indexCoordinate = settings.correctCoordinate.findIndex((coordinate) => coordinate === adventurer.direction)

        //Si l'index - 1 est supérieur ou égale à 0, on récupère l'index précédent en retirant 1
        indexCoordinate - 1 >= 0 ?
            adventurer.direction = settings.correctCoordinate[indexCoordinate - 1] as "N" | "O" | "E" | "S" :
            adventurer.direction = settings.correctCoordinate[settings.correctCoordinate.length - 1] as "N" | "O" | "E" | "S"

        return adventurer
    }

    //action pour changer le paramètre "x" ou "y" de l'aventurier pour avancer
    moveForward(adventurer: ITileAdventurer): ITileAdventurer {

        const { x, y, direction } = adventurer

        //sélectionne la prochaine position
        const newPosition = nextCase({ x, y, direction })

        //vérification si la prochaine position est possible dans le tableau de jeu
        const isValidNewPosition = this.isInMap({ x: newPosition.x, y: newPosition.y })

        //vérification si la prochaine case est un élément bloquant ou non
        const isBlocking = this.get_AllElementsIsBlockingInMap().find((element) => element.x === newPosition.x && element.y === newPosition.y)


        if (isValidNewPosition && !isBlocking) {
            let newAdventurer = {
                ...adventurer,
                x: newPosition.x,
                y: newPosition.y,
            }

            /** ------------------------ ADVENTURER ACTION ------------------------ */

            newAdventurer = this.collectTreasureIfAvailable(newAdventurer)


            //retourne l'aventurier avec les nouveaux paramètres
            return newAdventurer

        }

        //retourne l'aventurier dans l'état d'origine si la position n'était pas possible ou bloquante
        return adventurer
    }

    //fonction pour séléctionner l'action qui sera utilisé en fonction du paramètre "move" entre A (avancer), G (Gauche), D (Droite)
    //retourne ensuite le résultat de l'action
    //si aucune action n'était sélectionnable on retourne l'état d'origine
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







    /** ------------------------ GAME ------------------------ */

    //fonction pour faire 1 tour de jeu pour chaque aventurier, cela met à jour l'action de l'aventurier (avancer, gauche, droite, gain de trésor), reduction du séquençage
    turnAdventure() {
        const orderAdventurerNeedToMove: ITileAdventurer[] = []

        //boucle sur l'ordre des aventuriers
        this.mapOrderMoveAdventurer.forEach((adventurer) => {
            //vérification si l'aventurier à toujours une action à réaliser
            if (adventurer.sequentageToDo.length) {

                //vérification si l'action est réalisable
                if (isMoveCorrect(adventurer.sequentageToDo[0] as unknown as string)) {

                    //récupération des données mis à jour de l'action, aucun changement si invalidation pendant le processus
                    const newData = this.moveAdventure({
                        move: adventurer.sequentageToDo[0],
                        adventurer
                    })

                    //reduction du séquençage restant à l'aventurier
                    const newAdventurer = {
                        ...newData,
                        sequentageToDo: adventurer.sequentageToDo.slice(1)
                    }

                    //modification dans le tableau aventurier avec les nouvelles données
                    this.mapAdventurer = this.mapAdventurer.map((currentAdventurer) => {
                        if (currentAdventurer.uuid === adventurer.uuid)
                            return newAdventurer
                        return currentAdventurer
                    })

                    //si le séquençage n'est pas terminé pour l'aventurier celui-ci est remis dans la boucle pour ré-effectuer un tour
                    if (newAdventurer.sequentageToDo.length)
                        orderAdventurerNeedToMove.push(newAdventurer)
                }
            }
        })

        //modification dans le tableau pour l'ordre de passage
        this.mapOrderMoveAdventurer = orderAdventurerNeedToMove
    }


    //fonction pour démarrer le proccessus de partie
    startAdventure() {
        if (this.get_Adventurer().length) {
            //fonction pour récupérer le nombre maximum de tour tout aventurier confondu
            const secure = this.mapOrderMoveAdventurer.reduce(function (prev, current) {
                return (prev && prev.sequentageToDo.length > current.sequentageToDo.length) ? prev : current
            }).sequentageToDo.length

            //boucle safe pour boucler à l'infini tant que les utilisateurs
            for (let compteur = secure; compteur > 0; compteur--) {
                this.turnAdventure()
            }
        }

    }



}

export default Mapping
