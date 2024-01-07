import fs from 'fs';

function FileReader(filename: string): string[] {
    try {
        const allFileContents = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });

        //split(/\r?\n/) permet de diviser le fichier avec les retours chariots et/ou retours à la lignes dans le fichier
        return allFileContents.split(/\r?\n/)
    } catch (error) {
        return []
    }


}

export default FileReader