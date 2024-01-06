import { expect, jest, test } from '@jest/globals';
import { isMoveCorrect, isAxisCorrect, isTreasure, isAdventurer, nextCase } from '../utils/tileMap';


// --- Test isMoveCorrect --- //

test('isMoveCorrect true: Si la lettre envoyé pour faire un déplacement est correct', () => {
    expect(isMoveCorrect("A")).toBe(true)
});

test('isMoveCorrect true: Si la lettre envoyé pour faire un tour à droite est correct', () => {
    expect(isMoveCorrect("D")).toBe(true)
});

test('isMoveCorrect true: Si la lettre envoyé pour faire un tour à gauche est correct', () => {
    expect(isMoveCorrect("G")).toBe(true)
});

test('isMoveCorrect false: Si la lettre envoyé n\'existe pas', () => {
    expect(isMoveCorrect("R")).toBe(false)
});

test('isMoveCorrect false: Si une chaine de caractère est enovyé', () => {
    expect(isMoveCorrect("AA")).toBe(false)
});

// --- Fin isMoveCorrect --- //





// --- Test isAxisCorrect --- //

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




// --- Test isAdventurer --- //

// --- Test avec les différent longueur de nom --- //

test('isAdventurer true: Si les paramètres sont corrects', () => {
    expect(isAdventurer({ x: 1, y: 1, name: "Lara", direction: "N", move: "A" })).toBe(true)
});

test('isAdventurer false: Si le nom est vide', () => {
    expect(isAdventurer({ x: 1, y: 1, name: "", direction: "N", move: "A" })).toBe(false)
});

// --- Test avec les différentes coordonnées --- //

test('isAdventurer false: Si x est un float et y est un float', () => {
    expect(isAdventurer({ x: 1.1, y: 1.1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un entier et y est un float', () => {
    expect(isAdventurer({ x: 1, y: 1.1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un float et y est un entier', () => {
    expect(isAdventurer({ x: 1.1, y: 1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x et y sont 2 entiers négatif', () => {
    expect(isAdventurer({ x: -1, y: -1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un entier et y est un entier négatif', () => {
    expect(isAdventurer({ x: 1, y: -1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un entier négatif et y est un entier', () => {
    expect(isAdventurer({ x: -1, y: 1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un float négatif et y est un float négatif', () => {
    expect(isAdventurer({ x: -1.1, y: -1.1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un entier et y est un float négatif', () => {
    expect(isAdventurer({ x: 1, y: -1.1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

test('isAdventurer false: Si x est un float négatif et y est un entier', () => {
    expect(isAdventurer({ x: -1.1, y: 1, name: "Lara", direction: "N", move: "A" })).toBe(false)
});

// --- Fin isAdventurer --- //





// --- Test nextCase --- //

test('nextCase true, Si la direction est N, y vaudra 1 de moins', () => {
    expect(nextCase({ x: 1, y: 1, direction: 'N' })).toStrictEqual({ x: 1, y: 0 })
});

test('nextCase true, Si la direction est S, y vaudra 1 de plus', () => {
    expect(nextCase({ x: 1, y: 1, direction: 'S' })).toStrictEqual({ x: 1, y: 2 })
});

test('nextCase true, Si la direction est O, x vaudra 1 de moins', () => {
    expect(nextCase({ x: 1, y: 1, direction: 'O' })).toStrictEqual({ x: 0, y: 1 })
});

test('nextCase true, Si la direction est E, y vaudra 1 de plus', () => {
    expect(nextCase({ x: 1, y: 1, direction: 'E' })).toStrictEqual({ x: 2, y: 1 })
});