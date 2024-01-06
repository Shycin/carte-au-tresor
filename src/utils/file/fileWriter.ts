import { settings } from '../../constants/settings';
import fs from 'fs';

function FileWriter(filename: string, lines: string[]): boolean {
    const file = lines.join('\r\n')

    fs.writeFileSync(`${settings.gameFolder}/solve_${filename}`, file);

    return true
}

export default FileWriter