import { match } from 'assert';
import Mapping from './class/map';
import DirectoryParser from './utils/file/directoryParser';
import FileReader from './utils/file/fileParser';
import FileWriter from './utils/file/fileWriter';
import LineReader from './utils/file/lineParser';


function GenerateGame() {

    const allFile = DirectoryParser()

    allFile.filter((file) => file.match(/^game_.*/)).forEach((file) => {
        console.log("Start New Game")
        const newGameObject = LineReader(FileReader(file))

        if (newGameObject.carte) {
            const map = new Mapping(
                newGameObject.carte
            )

            newGameObject.montagne.forEach((each) => map.initMontagneTile(each))
            newGameObject.treasure.forEach((each) => map.initTreasureTile(each))
            newGameObject.aventurier.forEach((each) => map.initAdventurerTile(each))


            map.startAdventure()

            const solveFile = []

            solveFile.push(`C - ${map.mapSize.x} - ${map.mapSize.y}`)
            map.mapMountain.forEach((each) => solveFile.push(`M - ${each.x} - ${each.y}`))
            map.mapTreasure.forEach((each) => solveFile.push(`T - ${each.x} - ${each.y} - ${each.treasureCount}`))
            map.mapAdventurer.forEach((each) => solveFile.push(`A - ${each.name} - ${each.x} - ${each.y} - ${each.direction} - ${each.treasureCount}`))


            FileWriter(file, solveFile)
        }




    })
}

GenerateGame()