import { expect, jest, test } from '@jest/globals';
import LineReader from '../../utils/file/lineParser';

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
