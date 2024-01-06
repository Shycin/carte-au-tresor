import { settings } from '../../constants/settings';
import fs from 'fs';

function DirectoryReader(): string[] {
    return fs.readdirSync(settings.gameFolder);
}

export default DirectoryReader