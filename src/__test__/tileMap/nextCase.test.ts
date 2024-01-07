import { expect, jest, test } from '@jest/globals';
import { nextCase } from '../../utils/tileMap';


// --- Test nextCase --- //

describe('nextCase', () => {

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

})