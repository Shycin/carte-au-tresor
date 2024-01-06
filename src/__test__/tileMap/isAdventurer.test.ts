import { expect, jest, test } from '@jest/globals';
import { isAdventurer } from '../../utils/tileMap';



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