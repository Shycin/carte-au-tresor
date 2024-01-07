import { expect, jest, test } from '@jest/globals';
import { detectTypeTile, generateAdventurer, generateMountain, generateTreasure } from '../../utils/tileMap';


/** ------------------------ detectTypeTile ------------------------ */

describe('detectTypeTile', () => {

    test('La ligne traité est un aventurier au bon format', () => {
        const line = 'A - Lara - 1 - 2 - N - AAGGDD'
        expect(detectTypeTile(line)).toStrictEqual({ name: 'Lara', x: 1, y: 2, direction: 'N', move: 'AAGGDD' })
    });
    test('La ligne traité est un aventurier au mauvais format d\'espacement', () => {
        const line = 'A-Lara-1-2-N-AAGGDD'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });
    test('La ligne traité est un aventurier au mauvais format de type de caractère', () => {
        const line = 'A - Lara - A - 2 - N - AAGGDD'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });


    test('La ligne Carte traité est une carte au bon format', () => {
        const line = 'C - 1 - 2'
        expect(detectTypeTile(line)).toStrictEqual({ x: 1, y: 2 })
    });
    test('La ligne Carte traité est une carte au mauvais format d\'espacement', () => {
        const line = 'C-1-2'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });
    test('La ligne Carte traité est une carte au mauvais format de type de caractère', () => {
        const line = 'C - A - 2'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });


    test('La ligne traité est une montagne au bon format', () => {
        const line = 'M - 1 - 2'
        expect(detectTypeTile(line)).toStrictEqual({ x: 1, y: 2 })
    });
    test('La ligne traité est une montagne au mauvais format d\'espacement', () => {
        const line = 'M-1-2'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });
    test('La ligne traité est une montagne au mauvais format de type de caractère', () => {
        const line = 'M - A - 2'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });

    test('La ligne traité est un trésor au bon format', () => {
        const line = 'T - 1 - 2 - 3'
        expect(detectTypeTile(line)).toStrictEqual({ x: 1, y: 2, treasureCount: 3 })
    });
    test('La ligne traité est un trésor au mauvais format d\'espacement', () => {
        const line = 'T-1-2-3'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });
    test('La ligne traité est un trésor au mauvais format de type de caractère', () => {
        const line = 'T - A - 2 - 3'
        expect(detectTypeTile(line)).toStrictEqual(undefined)
    });
})




/** ------------------------ generateMountain ------------------------ */

describe('generateMountain', () => {
    test('Génération d\'une case montagne', () => {
        expect(generateMountain({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0, isBlocking: true, type: "montagne" })
    });
})


/** ------------------------ generateTreasure ------------------------ */

describe('generateTreasure', () => {
    test('Génération d\'une case trésor', () => {
        expect(generateTreasure({ x: 0, y: 0, treasureCount: 1 })).toStrictEqual({ x: 0, y: 0, treasureCount: 1, isBlocking: false, type: "treasure" })
    });
})


/** ------------------------ generateAdventurer ------------------------ */

describe('generateAdventurer', () => {
    test('Génération d\'une case avnturier', () => {
        const newAdevnturer = generateAdventurer({ x: 0, y: 0, name: 'Lara', move: 'AAGGDD', direction: 'N' })

        expect(newAdevnturer.uuid).toMatch(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/)
        expect(newAdevnturer).toStrictEqual({ x: 0, y: 0, name: "Lara", move: 'AAGGDD', direction: 'N', treasureCount: 0, isBlocking: true, type: "aventurier", sequentageToDo: ["A", "A", "G", "G", "D", "D"], uuid: newAdevnturer.uuid })
    });
})
