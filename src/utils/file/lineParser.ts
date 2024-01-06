import { ICoordonate, ICoordonateAdventurer, ICoordonateTreasure, IDirection, ILineParser, ISize } from "../../constants/function.dto";
import { isAdventurer, isAxisCorrect, isTreasure } from "../tileMap";

function LineReader(lines: string[]): ILineParser {
    let carteValues: ISize | null = null
    const treasureValues: ICoordonateTreasure[] = []
    const montagneValues: ICoordonate[] = []
    const aventurierValues: ICoordonateAdventurer[] = []

    lines.forEach((line) => {

        const partLine = line.split(' - ')

        switch (partLine[0]) {
            case "C":
                // Carte portion
                if (isAxisCorrect({
                    x: Number(partLine[1]),
                    y: Number(partLine[2])
                })) {
                    carteValues = {
                        x: Number(partLine[1]),
                        y: Number(partLine[2])
                    }
                }

                break;

            case "T":
                // Trésor portion
                if (isTreasure({
                    x: Number(partLine[1]),
                    y: Number(partLine[2]),
                    treasureCount: Number(partLine[3]),
                })) {
                    treasureValues.push({
                        x: Number(partLine[1]),
                        y: Number(partLine[2]),
                        treasureCount: Number(partLine[3])
                    })
                }
                break;

            case "M":
                // Montagne portion
                if (isAxisCorrect({
                    x: Number(partLine[1]),
                    y: Number(partLine[2]),
                })) {
                    montagneValues.push({
                        x: Number(partLine[1]),
                        y: Number(partLine[2])
                    })
                }
                break;

            case "A":
                // Aventurier portion
                if (isAdventurer({
                    name: partLine[1],
                    x: Number(partLine[2]),
                    y: Number(partLine[3]),
                    direction: partLine[4] as 'S' | 'N' | 'O' | 'E',
                    move: partLine[5]
                })) {
                    aventurierValues.push({
                        name: partLine[1],
                        x: Number(partLine[2]),
                        y: Number(partLine[3]),
                        direction: partLine[4] as 'S' | 'N' | 'O' | 'E',
                        move: partLine[5]
                    })
                }


                break;
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