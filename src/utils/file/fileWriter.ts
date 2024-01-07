import fs from 'fs';

function FileWriter(filename: string, lines: string[]): boolean {
    const file = lines.join('\r\n')

    try {
        fs.writeFileSync(filename, file);
    } catch (error) {
        return false
    }


    return true
}

export default FileWriter