import fs from 'fs';

function DirectoryReader(directory: string): string[] {
    return fs.readdirSync(directory);
}

export default DirectoryReader