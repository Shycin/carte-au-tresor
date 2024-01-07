import { expect, jest, test } from '@jest/globals';
import LineReader from '../../utils/file/lineParser';

describe('LineReader Montagne', () => {

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
})