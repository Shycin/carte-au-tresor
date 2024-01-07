import { expect, jest, test } from '@jest/globals';
import { isMoveCorrect } from '../../utils/tileMap';


// --- Test isMoveCorrect --- //
describe('isMoveCorrect', () => {

    test('isMoveCorrect true: Si la lettre envoyé pour faire un déplacement est correct', () => {
        expect(isMoveCorrect("A")).toBe(true)
    });

    test('isMoveCorrect true: Si la lettre envoyé pour faire un tour à droite est correct', () => {
        expect(isMoveCorrect("D")).toBe(true)
    });

    test('isMoveCorrect true: Si la lettre envoyé pour faire un tour à gauche est correct', () => {
        expect(isMoveCorrect("G")).toBe(true)
    });

    test('isMoveCorrect false: Si la lettre envoyé n\'existe pas', () => {
        expect(isMoveCorrect("R")).toBe(false)
    });

    test('isMoveCorrect false: Si une chaine de caractère est enovyé', () => {
        expect(isMoveCorrect("AA")).toBe(false)
    });

    // --- Fin isMoveCorrect --- //
})