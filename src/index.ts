import Mapping from './class/map';
import DirectoryParser from './utils/file/directoryParser';
import FileReader from './utils/file/fileParser';
import LineReader from './utils/file/lineParser';


function GenerateGame() {

    const allFile = DirectoryParser()
    allFile.forEach((file) => {

        const newGameObject = LineReader(FileReader(file))

        if (newGameObject.carte) {
            const map = new Mapping(
                newGameObject.carte
            )

            if (newGameObject.montagne.length) {
                newGameObject.montagne.forEach((each) => map.initMontagneTile(each))
            }

            if (newGameObject.treasure.length) {
                newGameObject.treasure.forEach((each) => map.initTreasureTile(each))
            }

            if (newGameObject.aventurier.length) {
                newGameObject.aventurier.forEach((each) => map.initAdventurerTile(each))
            }

            map.startAdventure()
            console.log(map.mapTreasure)
        }




    })
}

GenerateGame()