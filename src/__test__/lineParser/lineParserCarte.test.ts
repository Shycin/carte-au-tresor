import { expect, jest, test } from '@jest/globals';
import LineReader from '../../utils/file/lineParser';

describe('LineReader Carte', () => {

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
})