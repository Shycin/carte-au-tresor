import { expect, jest, test } from '@jest/globals';
import Mapping from '../class/map';
import { ICoordonateAdventurer, ITileAdventurer, ITileBase } from '../constants/function.dto';
import { generateAdventurer, generateMountain, generateTreasure } from '../constants/typeTile';


const objectMappingTest = {
    carte: { x: 3, y: 2 },
    treasure: [{ x: 1, y: 1, treasureCount: 3 }],
    montagne: [{ x: 1, y: 0 }],
    aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }] as ICoordonateAdventurer[],
}

const objectMappingTestDoubleAdventurer = {
    carte: { x: 3, y: 2 },
    treasure: [{ x: 1, y: 1, treasureCount: 3 }],
    montagne: [{ x: 1, y: 0 }],
    aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }, { name: 'Bruno', x: 2, y: 0, direction: 'S', move: 'AGAAGAGADADDADAA' }] as ICoordonateAdventurer[],
}

test('Génération d\'une carte', () => {
    const size = { x: 1, y: 1 }
    const map = new Mapping(size)

    expect(map.mapSize).toStrictEqual(size)
});

test('Détecter si les coordonnées sont possible dans la map', () => {
    const size = { x: 1, y: 1 }
    const map = new Mapping(size)

    expect(map.isInMap({ x: 0, y: 0 })).toBe(true)
});

test('Détecter si les coordonnées ne sont pas possible dans la map', () => {
    const size = { x: 1, y: 1 }
    const map = new Mapping(size)

    expect(map.isInMap({ x: 2, y: 2 })).toBe(false)
});



test('Initialiser les coordonnées des montagnes', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.montagne.forEach((each) => map.initMontagneTile(each))

    expect(map.mapMountain).toHaveLength(objectMappingTest.montagne.length)
});

test('Initialiser les coordonnées des trésors', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.treasure.forEach((each) => map.initTreasureTile(each))

    expect(map.mapTreasure).toHaveLength(objectMappingTest.treasure.length)
});

test('Initialiser les coordonnées des aventuriers', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.aventurier.forEach((each) => map.initAdventurerTile(each))

    expect(map.mapAdventurer).toHaveLength(objectMappingTest.aventurier.length)
});





test('Récupérer aucun éléments dans la map sans les initialiser', () => {
    const map = new Mapping(objectMappingTest.carte)

    expect(map.getAllElementsInMap()).toStrictEqual([])
});

test('Récupérer le même nombre d\'éléments dans la map que ceux instancier', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.montagne.forEach((each) => map.initMontagneTile(each))
    objectMappingTest.treasure.forEach((each) => map.initTreasureTile(each))
    objectMappingTest.aventurier.forEach((each) => map.initAdventurerTile(each))

    expect(map.getAllElementsInMap()).toHaveLength(
        objectMappingTest.montagne.length +
        objectMappingTest.treasure.length +
        objectMappingTest.aventurier.length
    )
});

test('Récupérer les même éléments dans la map que ceux instancier', () => {
    const map = new Mapping(objectMappingTest.carte)

    let ElementGenerate: ITileBase[] = []

    objectMappingTest.montagne.forEach((each) => { map.initMontagneTile(each); ElementGenerate.push(generateMountain(each)) })
    objectMappingTest.treasure.forEach((each) => { map.initTreasureTile(each); ElementGenerate.push(generateTreasure(each)) })
    objectMappingTest.aventurier.forEach((each) => { map.initAdventurerTile(each); ElementGenerate.push(generateAdventurer(each)) })

    // nullify uuid sinon les comparaisons ne seront pas équivalente
    const ElementInMap = map.getAllElementsInMap().map((element) => {
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



test('Récupérer le même nombre d\'éléments bloquant dans la map que ceux instancier', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.montagne.forEach((each) => map.initMontagneTile(each))
    objectMappingTest.aventurier.forEach((each) => map.initAdventurerTile(each))

    expect(map.getAllElementsIsBlockingInMap()).toHaveLength(
        objectMappingTest.montagne.length +
        objectMappingTest.aventurier.length
    )
});

test('Récupérer les même éléments bloquant dans la map que ceux instancier', () => {
    const map = new Mapping(objectMappingTest.carte)

    let ElementGenerate: ITileBase[] = []

    objectMappingTest.montagne.forEach((each) => { map.initMontagneTile(each); ElementGenerate.push(generateMountain(each)) })
    objectMappingTest.aventurier.forEach((each) => { map.initAdventurerTile(each); ElementGenerate.push(generateAdventurer(each)) })

    // nullify uuid sinon les comparaisons ne seront pas équivalente
    const ElementInMap = map.getAllElementsInMap().map((element) => {
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





test('Faire changer d\'orientation un aventurier vers la droite, du Nord à l\'Est', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AGD' })

    expect(map.turnRigth(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "E"
    })
});

test('Faire changer d\'orientation un aventurier vers la droite, de l\'Est au Sud', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'E', move: 'AGD' })

    expect(map.turnRigth(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "S"
    })
});

test('Faire changer d\'orientation un aventurier vers la droite, du Sud à l\'Ouest', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })

    expect(map.turnRigth(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "O"
    })
});

test('Faire changer d\'orientation un aventurier vers la droite, de l\'Ouest au Nord', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'O', move: 'AGD' })

    expect(map.turnRigth(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "N"
    })
});




test('Faire changer d\'orientation un aventurier vers la gauche, du Nord à l\'Ouest', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AGD' })

    expect(map.turnLeft(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "O"
    })
});

test('Faire changer d\'orientation un aventurier vers la gauche, de l\'Ouest au Sud', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'O', move: 'AGD' })

    expect(map.turnLeft(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "S"
    })
});

test('Faire changer d\'orientation un aventurier vers la gauche, du Sud à l\'Est', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })

    expect(map.turnLeft(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "E"
    })
});

test('Faire changer d\'orientation un aventurier vers la gauche, de l\'Est au Nord', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'E', move: 'AGD' })

    expect(map.turnLeft(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        direction: "N"
    })
});






test('Faire avancer un aventurier vers le Sud', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 1
    })
});

test('Faire avancer un aventurier vers le Nord', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 1, direction: 'N', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 0
    })
});

test('Faire avancer un aventurier vers l\'Ouest', () => {
    const map = new Mapping({ x: 2, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 1, y: 0, direction: 'O', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        x: 0
    })
});

test('Faire avancer un aventurier vers l\'Est', () => {
    const map = new Mapping({ x: 2, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'E', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        x: 1
    })
});





test('Faire avancer un aventurier dans une montagne', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
    map.initMontagneTile({ x: 0, y: 1 })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 0
    })
});

test('Faire avancer un aventurier dans une case hors map', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 0
    })
});

test('Faire avancer un aventurier dans une case avec un aventurier dessus', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
    map.initAdventurerTile({ name: 'Aventurier bloquant', x: 0, y: 1, direction: 'S', move: 'AGD' })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 0
    })
});

test('Faire avancer un aventurier dans une case avec un trésor dessus et récolte un trésor', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
    map.initTreasureTile({ x: 0, y: 1, treasureCount: 1 })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        treasureCount: newAdventurer.treasureCount + 1,
        y: 1
    })
});

test('Faire avancer un aventurier dans une case avec un trésor vide dessus et ne récolte pas de trésor', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
    map.initTreasureTile({ x: 0, y: 1, treasureCount: 0 })

    expect(map.moveForward(newAdventurer)).toStrictEqual({
        ...newAdventurer,
        y: 1
    })
});






test('Lancer une séquence d\'action pour avancer', () => {
    const map = new Mapping({ x: 1, y: 2 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'A' })

    expect(map.moveAdventure({ move: newAdventurer.sequentageToDo[0], adventurer: newAdventurer })).toStrictEqual({
        ...newAdventurer,
        y: 1
    })
});

test('Lancer une séquence d\'action pour tourner à gauche', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'G' })

    expect(map.moveAdventure({ move: newAdventurer.sequentageToDo[0], adventurer: newAdventurer })).toStrictEqual({
        ...newAdventurer,
        direction: 'E'
    })
});

test('Lancer une séquence d\'action pour tourner à droite', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'D' })

    expect(map.moveAdventure({ move: newAdventurer.sequentageToDo[0], adventurer: newAdventurer })).toStrictEqual({
        ...newAdventurer,
        direction: 'O'
    })
});

test('Lancer une séquence d\'action inexistante', () => {
    const map = new Mapping({ x: 1, y: 1 })

    const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: '0' })

    expect(map.moveAdventure({ move: newAdventurer.sequentageToDo[0], adventurer: newAdventurer })).toStrictEqual({
        ...newAdventurer
    })
});




test('Lancer un tour pour un aventurier pour avancer d\'une case sur une case libre', () => {
    const map = new Mapping({ x: 1, y: 2 })

    map.initAdventurerTile({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'A' })


    const ElementInMapBeforeMove = map.mapAdventurer
    map.turnAdventure()
    const ElementInMapAfterMove = map.mapAdventurer


    expect(ElementInMapBeforeMove).not.toEqual(ElementInMapAfterMove)
});

test('Lancer un tour pour un aventurier pour avancer d\'une case sur une case non libre', () => {
    const map = new Mapping({ x: 1, y: 1 })

    map.initAdventurerTile({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'A' })

    // supprimer la sequence qui va se produire pour la comparaison, c'est le seul changement
    const ElementInMapBeforeMove = map.mapAdventurer.map((adventurer) => {
        return {
            ...adventurer,
            sequentageToDo: adventurer.sequentageToDo.slice(1)
        }
    })
    map.turnAdventure()
    const ElementInMapAfterMove = map.mapAdventurer

    expect(ElementInMapBeforeMove).toEqual(ElementInMapAfterMove)
});






test('Lancer une partie avec 1 aventurier, récolte 2 trésors', () => {
    const map = new Mapping(objectMappingTest.carte)

    objectMappingTest.montagne.forEach((each) => map.initMontagneTile(each))
    objectMappingTest.treasure.forEach((each) => map.initTreasureTile(each))
    objectMappingTest.aventurier.forEach((each) => map.initAdventurerTile(each))

    const ElementInMapBeforeStart = map.mapAdventurer
    const ElementInTreasureBeforeStart = map.mapTreasure
    map.startAdventure()

    const ElementInTreasureAfterStart = map.mapTreasure

    expect(map.mapAdventurer).toEqual([{
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

    objectMappingTestDoubleAdventurer.montagne.forEach((each) => map.initMontagneTile(each))
    objectMappingTestDoubleAdventurer.treasure.forEach((each) => map.initTreasureTile(each))
    objectMappingTestDoubleAdventurer.aventurier.forEach((each) => map.initAdventurerTile(each))

    const ElementInMapBeforeStart = map.mapAdventurer
    const ElementInTreasureBeforeStart = map.mapTreasure
    map.startAdventure()

    const ElementInTreasureAfterStart = map.mapTreasure

    expect(map.mapAdventurer).toEqual([{
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
