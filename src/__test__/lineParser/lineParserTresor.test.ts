import { expect, jest, test } from '@jest/globals';
import LineReader from '../../utils/file/lineParser';

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