import { expect, jest, test } from '@jest/globals';
import { isMoveCorrect, isAxisCorrect, isTreasure, isAdventurer, nextCase } from '../../utils/tileMap';


// --- Test isAxisCorrect --- //
describe('isAxisCorrect', () => {

    test('isAxisCorrect true: Si x et y sont 2 entiers', () => {
        expect(isAxisCorrect({ x: 1, y: 1 })).toBe(true)
    });

    test('isAxisCorrect false: Si x est un float et y est un float', () => {
        expect(isAxisCorrect({ x: 1.1, y: 1.1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un entier et y est un float', () => {
        expect(isAxisCorrect({ x: 1, y: 1.1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un float et y est un entier', () => {
        expect(isAxisCorrect({ x: 1.1, y: 1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x et y sont 2 entiers négatif', () => {
        expect(isAxisCorrect({ x: -1, y: -1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un entier et y est un entier négatif', () => {
        expect(isAxisCorrect({ x: 1, y: -1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un entier négatif et y est un entier', () => {
        expect(isAxisCorrect({ x: -1, y: 1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un float négatif et y est un float négatif', () => {
        expect(isAxisCorrect({ x: -1.1, y: -1.1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un entier et y est un float négatif', () => {
        expect(isAxisCorrect({ x: 1, y: -1.1 })).toBe(false)
    });

    test('isAxisCorrect false: Si x est un float négatif et y est un entier', () => {
        expect(isAxisCorrect({ x: -1.1, y: 1 })).toBe(false)
    });

    // --- Fin isAxisCorrect --- //
})