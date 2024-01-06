import { expect, jest, test } from '@jest/globals';
import create_UUID from '../utils/uuid';

test('La création d\'un UUID est de la bonne forme', () => {
    expect(create_UUID()).toMatch(/^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/)
});


test('Que 2 UUID créée en même temps ne soit pas égale', () => {
    const firstTime = create_UUID()
    const secondeTime = create_UUID()
    expect(firstTime).not.toBe(secondeTime)
});