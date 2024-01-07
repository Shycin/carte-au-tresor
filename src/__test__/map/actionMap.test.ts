import { expect, jest, test } from '@jest/globals';
import Mapping from '../../class/map';
import { ITileAdventurer } from '../../constants/tileAdventurer.dto';
import { generateAdventurer } from '../../utils/tileMap';


/** ------------------------ cleanTreasureIfEmpty ------------------------ */

describe('cleanTreasureIfEmpty', () => {

    test('Supprimer un trésor si celui-ci est vide', () => {
        const map = new Mapping({ x: 1, y: 1 })

        const treasure = { x: 0, y: 0, treasureCount: 1 }
        const adventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AGD' })

        map.addTreasureTile(treasure)
        const newAdventurer = map.collectTreasureIfAvailable(adventurer)

        expect(map.get_Treasure()).toHaveLength(0)
    });

    test('Ne pas supprimer de trésor si celui-ci n\'est pas vide', () => {
        const map = new Mapping({ x: 1, y: 1 })

        const treasure = { x: 0, y: 0, treasureCount: 1 }
        map.addTreasureTile(treasure)
        map.cleanTreasureIfEmpty()

        expect(map.get_Treasure()).toHaveLength(1)
    });

})


/** ------------------------ collectTreasureIfAvailable ------------------------ */

describe('collectTreasureIfAvailable', () => {

    test('Collecter un trésor si l\'aventurier viens sur la case', () => {
        const map = new Mapping({ x: 1, y: 1 })

        const treasure = { x: 0, y: 0, treasureCount: 1 }
        const adventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AGD' })

        map.addTreasureTile(treasure)
        const newAdventurer = map.collectTreasureIfAvailable(adventurer)

        expect(newAdventurer).toStrictEqual({
            ...adventurer,
            treasureCount: adventurer.treasureCount + 1
        })
    });

    test('Ne pas collecter un trésor si l\'aventurier viens sur une case sans trésor', () => {
        const map = new Mapping({ x: 2, y: 2 })

        const treasure = { x: 1, y: 1, treasureCount: 1 }
        const adventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AGD' })

        map.addTreasureTile(treasure)
        const newAdventurer = map.collectTreasureIfAvailable(adventurer)

        expect(newAdventurer).toStrictEqual(adventurer)
    });

})



/** ------------------------ turnRigth ------------------------ */

describe('turnRigth', () => {

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

})



/** ------------------------ turnLeft ------------------------ */

describe('turnLeft', () => {

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

})




/** ------------------------ moveForward ------------------------ */

describe('moveForward', () => {

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
        map.addMontagneTile({ x: 0, y: 1 })

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
        map.addAdventurerTile({ name: 'Aventurier bloquant', x: 0, y: 1, direction: 'S', move: 'AGD' })

        expect(map.moveForward(newAdventurer)).toStrictEqual({
            ...newAdventurer,
            y: 0
        })
    });

    test('Faire avancer un aventurier dans une case avec un trésor dessus et récolte un trésor', () => {
        const map = new Mapping({ x: 1, y: 2 })

        const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
        map.addTreasureTile({ x: 0, y: 1, treasureCount: 1 })

        expect(map.moveForward(newAdventurer)).toStrictEqual({
            ...newAdventurer,
            treasureCount: newAdventurer.treasureCount + 1,
            y: 1
        })
    });

    test('Faire avancer un aventurier dans une case avec un trésor vide dessus et ne récolte pas de trésor', () => {
        const map = new Mapping({ x: 1, y: 2 })

        const newAdventurer = generateAdventurer({ name: 'Lara', x: 0, y: 0, direction: 'S', move: 'AGD' })
        map.addTreasureTile({ x: 0, y: 1, treasureCount: 0 })

        expect(map.moveForward(newAdventurer)).toStrictEqual({
            ...newAdventurer,
            y: 1
        })
    });

})



/** ------------------------ moveAdventure ------------------------ */

describe('moveAdventure', () => {

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
})