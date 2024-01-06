import { expect, jest, test } from '@jest/globals';
import { generateAdventurer, generateMountain, generatePlain, generateTreasure } from '../constants/typeTile';


test('Génération d\'une case plaine', () => {
    expect(generatePlain({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0, isBlocking: false, type: "plaine" })
});

test('Génération d\'une case montagne', () => {
    expect(generateMountain({ x: 0, y: 0 })).toStrictEqual({ x: 0, y: 0, isBlocking: true, type: "montagne" })
});

test('Génération d\'une case trésor', () => {
    expect(generateTreasure({ x: 0, y: 0, treasureCount: 1 })).toStrictEqual({ x: 0, y: 0, treasureCount: 1, isBlocking: false, type: "treasure" })
});

test('Génération d\'une case avnturier', () => {
    const newAdevnturer = generateAdventurer({ x: 0, y: 0, name: 'Lara', move: 'AAGGDD', direction: 'N' })

    expect(newAdevnturer.uuid).toMatch(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/)
    expect(newAdevnturer).toStrictEqual({ x: 0, y: 0, name: "Lara", move: 'AAGGDD', direction: 'N', treasureCount: 0, isBlocking: true, type: "aventurier", sequentageToDo: ["A", "A", "G", "G", "D", "D"], uuid: newAdevnturer.uuid })
});
