import { expect, jest, test } from '@jest/globals';
import DirectoryReader from '../utils/file/directoryParser';
import FileReader from '../utils/file/fileParser';
import FileWriter from '../utils/file/fileWriter';

describe('DirectoryReader', () => {

    test("Liste les fichiers dans un dossier", () => {
        const result = DirectoryReader("./src/__mocks__");
        expect(result).toEqual(["testFile1.txt"]);
    });

})

describe('FileReader', () => {

    test("Liste les lignes présentes dans le fichier", () => {
        const result = FileReader("./src/__mocks__/testFile1.txt");
        expect(result).toEqual(["ceci est un fichier test mocker", "Ligne 2", "", "Ligne 3"]);
    });

    test("Retourne un tableau vide si fichier inexistant", () => {
        const result = FileReader("./src/__mocks__/testFile2.txt");
        expect(result).toEqual([]);
    });

})

describe('FileWriter', () => {

    test("Ecrit les lignes présentes dans un tableau dans le fichier", () => {
        const lignes = ["ceci est un fichier test mocker", "Ligne 2", "", "Ligne 3"]

        const isWrite = FileWriter("./src/__mocks__/testFile1.txt", lignes)
        expect(isWrite).toBe(true);

        const result = FileReader("./src/__mocks__/testFile1.txt");
        expect(result).toEqual(lignes);
    });
})



