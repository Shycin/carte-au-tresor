import Mapping from './class/map';
import DirectoryParser from './utils/file/directoryParser';
import FileReader from './utils/file/fileParser';
import LineReader from './utils/file/lineParser';


function GenerateGame() {

    const allFile = DirectoryParser()
    allFile.forEach((file) => {
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
            console.log(map.mapAdventurer)
            console.log(map.mapTreasure)
        }




    })
}

GenerateGame()