import { expect, jest, test } from '@jest/globals';
import LineReader from '../utils/file/lineParser';

test('La ligne traité est un commentaire', () => {
    const lines = ['# ceci est un commentaire']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});

test('La ligne traité est une ligne quelconque', () => {
    const lines = ['bonjour ceci est un message quelconque']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});




test('La ligne Carte traité est une carte au bon format', () => {
    const lines = ['C - 1 - 2']
    expect(LineReader(lines)).toStrictEqual({ carte: { x: 1, y: 2 }, aventurier: [], montagne: [], treasure: [] })
});
test('La ligne Carte traité est une carte au mauvais format d\'espacement', () => {
    const lines = ['C-1-2']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});
test('La ligne Carte traité est une carte au mauvais format de type de caractère', () => {
    const lines = ['C - A - 2']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});




test('La ligne traité est un aventurier au bon format', () => {
    const lines = ['A - Lara - 1 - 2 - N - AAGGDD']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [{ name: 'Lara', x: 1, y: 2, direction: 'N', move: 'AAGGDD' }], montagne: [], treasure: [] })
});
test('La ligne traité est un aventurier au mauvais format d\'espacement', () => {
    const lines = ['A-Lara-1-2-N-AAGGDD']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});
test('La ligne traité est un aventurier au mauvais format de type de caractère', () => {
    const lines = ['A - Lara - A - 2 - N - AAGGDD']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});




test('La ligne traité est une montagne au bon format', () => {
    const lines = ['M - 1 - 2']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [{ x: 1, y: 2 }], treasure: [] })
});
test('La ligne traité est une montagne au mauvais format d\'espacement', () => {
    const lines = ['M-1-2']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});
test('La ligne traité est une montagne au mauvais format de type de caractère', () => {
    const lines = ['M - A - 2']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});




test('La ligne traité est un trésor au bon format', () => {
    const lines = ['T - 1 - 2 - 3']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [{ x: 1, y: 2, treasureCount: 3 }] })
});
test('La ligne traité est un trésor au mauvais format d\'espacement', () => {
    const lines = ['T-1-2-3']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});
test('La ligne traité est un trésor au mauvais format de type de caractère', () => {
    const lines = ['T - A - 2 - 3']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});




test('Les lignes traités sont au bon format', () => {
    const lines = ['# ceci est un commentaire', 'C - 5 - 5', 'A - Lara - 0 - 0 - N - AAGGDD', 'M - 1 - 1', 'T - 1 - 2 - 3']
    expect(LineReader(lines)).toStrictEqual({ carte: { x: 5, y: 5 }, aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AAGGDD' }], montagne: [{ x: 1, y: 1 }], treasure: [{ x: 1, y: 2, treasureCount: 3 }] })
});


