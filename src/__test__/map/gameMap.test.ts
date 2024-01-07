import { expect, jest, test } from '@jest/globals';
import Mapping from '../../class/map';
import { ISize, ITileBase } from '../../constants/function.dto';
import { ITileAdventurer, ICoordonateAdventurer } from '../../constants/tileAdventurer.dto';
import { ITileTreasure } from '../../constants/tileTreasure.dto';


const objectMappingTest = {
    carte: { x: 3, y: 2 } as ISize,
    treasure: [{ x: 1, y: 1, treasureCount: 3 }] as ITileTreasure[],
    montagne: [{ x: 1, y: 0 }] as ITileBase[],
    aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }] as ITileAdventurer[],
}

const objectMappingTestDoubleAdventurer = {
    carte: { x: 3, y: 2 } as ISize,
    treasure: [{ x: 1, y: 1, treasureCount: 3 }] as ITileTreasure[],
    montagne: [{ x: 1, y: 0 }] as ITileBase[],
    aventurier: [
        { name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' },
        { name: 'Bruno', x: 2, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }
    ] as ICoordonateAdventurer[],
}


/** ------------------------ turnAdventure ------------------------ */

describe('turnAdventure', () => {

    test('Lancer un tour pour un aventurier pour avancer d\'une case sur une case libre', () => {
        const map = new Mapping({ x: 1, y: 2 })

        map.addAdventurerTile({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'A' })


        const ElementInMapBeforeMove = map.get_Adventurer()
        map.turnAdventure()
        const ElementInMapAfterMove = map.get_Adventurer()


        expect(ElementInMapBeforeMove).not.toEqual(ElementInMapAfterMove)
    });

    test('Lancer un tour pour un aventurier pour avancer d\'une case sur une case non libre', () => {
        const map = new Mapping({ x: 1, y: 1 })

        map.addAdventurerTile({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'A' })

        // supprimer la sequence qui va se produire pour la comparaison, c'est le seul changement
        const ElementInMapBeforeMove = map.get_Adventurer().map((adventurer) => {
            return {
                ...adventurer,
                sequentageToDo: adventurer.sequentageToDo.slice(1)
            }
        })
        map.turnAdventure()
        const ElementInMapAfterMove = map.get_Adventurer()

        expect(ElementInMapBeforeMove).toEqual(ElementInMapAfterMove)
    });
})


/** ------------------------ startAdventure ------------------------ */

describe('startAdventure', () => {

    test('Lancer une partie avec 1 aventurier, récolte 2 trésors', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.montagne.forEach((each) => map.addMontagneTile(each))
        objectMappingTest.treasure.forEach((each) => map.addTreasureTile(each))
        objectMappingTest.aventurier.forEach((each) => map.addAdventurerTile(each))

        const ElementInMapBeforeStart = map.get_Adventurer()
        const ElementInTreasureBeforeStart = map.get_Treasure()
        map.startAdventure()

        const ElementInTreasureAfterStart = map.get_Treasure()

        expect(map.get_Adventurer()).toEqual([{
            ...ElementInMapBeforeStart[0],
            y: 1,
            direction: 'O',
            treasureCount: 2,
            sequentageToDo: []
        }])

        expect(ElementInTreasureAfterStart).toEqual([
            {
                ...ElementInTreasureBeforeStart[0],
                treasureCount: 1
            }
        ])
    });


    test('Lancer une partie avec 2 aventuriers', () => {
        const map = new Mapping(objectMappingTestDoubleAdventurer.carte)

        objectMappingTestDoubleAdventurer.montagne.forEach((each) => map.addMontagneTile(each))
        objectMappingTestDoubleAdventurer.treasure.forEach((each) => map.addTreasureTile(each))
        objectMappingTestDoubleAdventurer.aventurier.forEach((each) => map.addAdventurerTile(each))

        const ElementInMapBeforeStart = map.get_Adventurer()
        const ElementInTreasureBeforeStart = map.get_Treasure()
        map.startAdventure()

        const ElementInTreasureAfterStart = map.get_Treasure()

        expect(map.get_Adventurer()).toEqual([{
            ...ElementInMapBeforeStart[0],
            y: 1,
            direction: 'O',
            treasureCount: 1,
            sequentageToDo: []
        },
        {
            ...ElementInMapBeforeStart[1],
            x: 1,
            y: 1,
            direction: 'O',
            treasureCount: 1,
            sequentageToDo: []
        }])

        expect(ElementInTreasureAfterStart).toEqual([
            {
                ...ElementInTreasureBeforeStart[0],
                treasureCount: 1
            }
        ])
    });
})