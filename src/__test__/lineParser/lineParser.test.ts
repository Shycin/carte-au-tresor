import { expect, jest, test } from '@jest/globals';
import LineReader from '../../utils/file/lineParser';

test('La ligne traité est un commentaire', () => {
    const lines = ['# ceci est un commentaire']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});

test('La ligne traité est une ligne quelconque', () => {
    const lines = ['bonjour ceci est un message quelconque']
    expect(LineReader(lines)).toStrictEqual({ carte: null, aventurier: [], montagne: [], treasure: [] })
});



test('Les lignes traités sont au bon format', () => {
    const lines = ['# ceci est un commentaire', 'C - 5 - 5', 'A - Lara - 0 - 0 - N - AAGGDD', 'M - 1 - 1', 'T - 1 - 2 - 3']
    expect(LineReader(lines)).toStrictEqual({ carte: { x: 5, y: 5 }, aventurier: [{ name: 'Lara', x: 0, y: 0, direction: 'N', move: 'AAGGDD' }], montagne: [{ x: 1, y: 1 }], treasure: [{ x: 1, y: 2, treasureCount: 3 }] })
});


