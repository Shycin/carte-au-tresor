import { ICoordonate, ILineParser, ISize } from "../../constants/function.dto";
import { ICoordonateAdventurer } from "../../constants/tileAdventurer.dto";
import { ICoordonateTreasure } from "../../constants/tileTreasure.dto";
import { detectTypeTile } from "../tileMap";

function LineReader(lines: string[]): ILineParser {
    let carteValues: ISize | null = null

    const treasureValues: ICoordonateTreasure[] = []
    const montagneValues: ICoordonate[] = []
    const aventurierValues: ICoordonateAdventurer[] = []

    lines.forEach((line) => {
        const lineDetected = detectTypeTile(line)
        const type = line.split(' - ')

        if (lineDetected) {
            //Détect la première lettre pour pouvoir assigner les résultats précis au bon tableau
            switch (type[0]) {
                case "C": carteValues = lineDetected; break;

                case "T": treasureValues.push(lineDetected as ICoordonateTreasure); break;

                case "M": montagneValues.push(lineDetected as ICoordonate); break;

                case "A": aventurierValues.push(lineDetected as ICoordonateAdventurer); break;
            }
        }
    })

    return {
        carte: carteValues,
        treasure: treasureValues,
        montagne: montagneValues,
        aventurier: aventurierValues
    }
}

export default LineReader