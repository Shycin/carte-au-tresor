import { expect, jest, test } from '@jest/globals';
import { isTreasure } from '../../utils/tileMap';


// --- Test isTreasure --- //

// --- Test avec les différent nombres de trésor --- //

test('isTreasure true: Si x et y sont 2 entiers et le trésor est un entier', () => {
    expect(isTreasure({ x: 1, y: 1, treasureCount: 1 })).toBe(true)
});

test('isTreasure false: Si le trésor est à 0', () => {
    expect(isTreasure({ x: 1, y: 1, treasureCount: 0 })).toBe(false)
});

test('isTreasure false: Si le trésor est un entier négatif', () => {
    expect(isTreasure({ x: 1, y: 1, treasureCount: -1 })).toBe(false)
});

test('isTreasure false: Si le trésor est un float', () => {
    expect(isTreasure({ x: 1, y: 1, treasureCount: 1.1 })).toBe(false)
});

// --- Test avec les différentes coordonnées --- //

test('isTreasure false: Si x est un float et y est un float', () => {
    expect(isTreasure({ x: 1.1, y: 1.1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un entier et y est un float', () => {
    expect(isTreasure({ x: 1, y: 1.1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un float et y est un entier', () => {
    expect(isTreasure({ x: 1.1, y: 1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x et y sont 2 entiers négatif', () => {
    expect(isTreasure({ x: -1, y: -1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un entier et y est un entier négatif', () => {
    expect(isTreasure({ x: 1, y: -1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un entier négatif et y est un entierr', () => {
    expect(isTreasure({ x: -1, y: 1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un float négatif et y est un float négatif', () => {
    expect(isTreasure({ x: -1.1, y: -1.1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un entier et y est un float négatif', () => {
    expect(isTreasure({ x: 1, y: -1.1, treasureCount: 1 })).toBe(false)
});

test('isTreasure false: Si x est un float négatif et y est un entier', () => {
    expect(isTreasure({ x: -1.1, y: 1, treasureCount: 1 })).toBe(false)
});

// --- Fin isTreasure --- //