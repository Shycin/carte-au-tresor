import { settings } from '../../constants/settings';
import fs from 'fs';

function FileReader(filename: string): string[] {
    const allFileContents = fs.readFileSync(`${settings.gameFolder}/${filename}`, { encoding: 'utf8', flag: 'r' });
    return allFileContents.split(/\r?\n/)
}

export default FileReader