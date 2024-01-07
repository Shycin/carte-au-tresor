import { expect, jest, test } from '@jest/globals';
import Mapping from '../../class/map';
import { ITileAdventurer } from '../../constants/tileAdventurer.dto';
import { ITileTreasure } from '../../constants/tileTreasure.dto';
import { ISize, ITileBase } from '../../constants/function.dto';
import { generateAdventurer, generateMountain, generateTreasure } from '../../utils/tileMap';

const objectMappingTest = {
    carte: { x: 3, y: 2 } as ISize,
    treasure: [{ x: 1, y: 1, treasureCount: 3 }] as ITileTreasure[],
    montagne: [{ x: 1, y: 0 }] as ITileBase[],
    aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }] as ITileAdventurer[],
}

/** ------------------------ get_MapSize ------------------------ */

describe('get_MapSize', () => {

    test('Getter taille de la carte', () => {
        const size = { x: 1, y: 1 } as ISize
        const map = new Mapping(size)

        expect(map.get_MapSize()).toStrictEqual(size)
    });
})


/** ------------------------ get_Mountains ------------------------ */

describe('get_Mountains', () => {

    test('Getter des coordonnées des montagnes', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.montagne.forEach((each) => map.addMontagneTile(each))
        expect(map.get_Mountains()).toHaveLength(objectMappingTest.montagne.length)
    });
})


/** ------------------------ get_Treasure ------------------------ */

describe('get_Treasure', () => {

    test('Getter des coordonnées des trésors', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.treasure.forEach((each) => map.addTreasureTile(each))
        expect(map.get_Treasure()).toHaveLength(objectMappingTest.treasure.length)
    });
})


/** ------------------------ get_Adventurer ------------------------ */

describe('get_Adventurer', () => {

    test('Getter des coordonnées des aventuriers', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.aventurier.forEach((each) => map.addAdventurerTile(each))
        expect(map.get_Adventurer()).toHaveLength(objectMappingTest.aventurier.length)
    });
})



/** ------------------------ get_AllElementsInMap ------------------------ */

describe('get_AllElementsInMap', () => {

    test('Récupérer aucun éléments dans la map sans les initialiser', () => {
        const map = new Mapping(objectMappingTest.carte)

        expect(map.get_AllElementsInMap()).toStrictEqual([])
    });

    test('Récupérer le même nombre d\'éléments dans la map que ceux instancier', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.montagne.forEach((each) => map.addMontagneTile(each))
        objectMappingTest.treasure.forEach((each) => map.addTreasureTile(each))
        objectMappingTest.aventurier.forEach((each) => map.addAdventurerTile(each))

        expect(map.get_AllElementsInMap()).toHaveLength(
            objectMappingTest.montagne.length +
            objectMappingTest.treasure.length +
            objectMappingTest.aventurier.length
        )
    });

    test('Récupérer les même éléments dans la map que ceux instancier', () => {
        const map = new Mapping(objectMappingTest.carte)

        let ElementGenerate: ITileBase[] = []

        objectMappingTest.montagne.forEach((each) => { map.addMontagneTile(each); ElementGenerate.push(generateMountain(each)) })
        objectMappingTest.treasure.forEach((each) => { map.addTreasureTile(each); ElementGenerate.push(generateTreasure(each)) })
        objectMappingTest.aventurier.forEach((each) => { map.addAdventurerTile(each); ElementGenerate.push(generateAdventurer(each)) })

        // nullify uuid sinon les comparaisons ne seront pas équivalente
        const ElementInMap = map.get_AllElementsInMap().map((element) => {
            const adventurer = element as ITileAdventurer
            if (adventurer.uuid) {
                return { ...adventurer, uuid: null }
            }

            return element
        })

        // nullify uuid sinon les comparaisons ne seront pas équivalente
        ElementGenerate = ElementGenerate.map((element) => {
            const adventurer = element as ITileAdventurer
            if (adventurer.uuid) {
                return { ...adventurer, uuid: null }
            }

            return element
        })


        expect(ElementInMap).toStrictEqual(ElementGenerate)
    });

})

/** ------------------------ get_AllElementsIsBlockingInMap ------------------------ */

describe('get_AllElementsIsBlockingInMap', () => {

    test('Récupérer le même nombre d\'éléments bloquant dans la map que ceux instancier', () => {
        const map = new Mapping(objectMappingTest.carte)

        objectMappingTest.montagne.forEach((each) => map.addMontagneTile(each))
        objectMappingTest.aventurier.forEach((each) => map.addAdventurerTile(each))

        expect(map.get_AllElementsIsBlockingInMap()).toHaveLength(
            objectMappingTest.montagne.length +
            objectMappingTest.aventurier.length
        )
    });

    test('Récupérer les même éléments bloquant dans la map que ceux instancier', () => {
        const map = new Mapping(objectMappingTest.carte)

        let ElementGenerate: ITileBase[] = []

        objectMappingTest.montagne.forEach((each) => { map.addMontagneTile(each); ElementGenerate.push(generateMountain(each)) })
        objectMappingTest.aventurier.forEach((each) => { map.addAdventurerTile(each); ElementGenerate.push(generateAdventurer(each)) })

        // nullify uuid sinon les comparaisons ne seront pas équivalente
        const ElementBlockingInMap = map.get_AllElementsIsBlockingInMap().map((element) => {
            const adventurer = element as ITileAdventurer
            if (adventurer.uuid) {
                return { ...adventurer, uuid: null }
            }

            return element
        })

        // nullify uuid sinon les comparaisons ne seront pas équivalente
        ElementGenerate = ElementGenerate.map((element) => {
            const adventurer = element as ITileAdventurer
            if (adventurer.uuid) {
                return { ...adventurer, uuid: null }
            }

            return element
        })

        expect(ElementBlockingInMap).toStrictEqual(ElementGenerate)
    });

})