import { expect, jest, test } from '@jest/globals';
import Mapping from '../../class/map';


/** ------------------------ isInMap ------------------------ */

describe('isInMap', () => {

    test('Détecter si les coordonnées sont possible dans la map', () => {
        const size = { x: 1, y: 1 }
        const map = new Mapping(size)

        expect(map.isInMap({ x: 0, y: 0 })).toBe(true)
    });

    test('Détecter si les coordonnées ne sont pas possible dans la map', () => {
        const size = { x: 1, y: 1 }
        const map = new Mapping(size)

        expect(map.isInMap({ x: 2, y: 2 })).toBe(false)
    });
})

/** ------------------------ isInstantiable ------------------------ */

describe('isInstantiable', () => {

    test('Détecter si les coordonnées sont instantiable dans la map', () => {
        const map = new Mapping({ x: 1, y: 1 })

        expect(map.isInstantiable({ x: 0, y: 0 })).toBe(true)
    });

    test('Détecter si les coordonnées ne sont pas instantiable dans la map', () => {
        const montagnes = [{ x: 0, y: 0 }]
        const map = new Mapping({ x: 1, y: 1 })

        montagnes.forEach((each) => map.addMontagneTile(each))

        expect(map.isInstantiable({ x: 0, y: 0 })).toBe(false)
    });
})