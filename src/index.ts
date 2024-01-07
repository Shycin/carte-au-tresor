import { match } from 'assert';
import Mapping from './class/map';
import DirectoryParser from './utils/file/directoryParser';
import FileReader from './utils/file/fileParser';
import FileWriter from './utils/file/fileWriter';
import LineReader from './utils/file/lineParser';
import { settings } from './constants/settings';


function GenerateGame() {

    //Liste tout les fichiers dans le dossier jeux
    const allFile = DirectoryParser(settings.gameFolder)

    //Filtre la boucle de jeux que pour ceux commencant par "game_"
    allFile.filter((file) => file.match(/^game_.*/)).forEach((file) => {

        //Lit le fichier grace à son nom (FileReader) et retourne une liste de string réutiliser dans le lecteur de ligne (LineReader)
        //LineReader retourne un objet contenant les objets : carte, montagne, treasure, aventurier
        const newGameObject = LineReader(FileReader(`${settings.gameFolder}/${file}`))

        //vérification si l'objet carte existe dans le fichier de jeux
        if (newGameObject.carte && newGameObject.aventurier.length) {

            console.log('\x1b[33m\u2139', `Début nouvelle partie avec le fichier : ${settings.gameFolder}/${file}`)

            //création de l'instance de jeu via une class
            const map = new Mapping(
                newGameObject.carte
            )

            //initialisation des différentes tuile sur le jeu
            newGameObject.montagne.forEach((each) => map.addMontagneTile(each))
            newGameObject.treasure.forEach((each) => map.addTreasureTile(each))
            newGameObject.aventurier.forEach((each) => map.addAdventurerTile(each))


            //lancement boucle du jeu
            map.startAdventure()
            ShowResultInFile(map, file)
        }




    })
}

GenerateGame()





function ShowResultInFile(map: Mapping, file: string) {

    //formattage résultat de la boucle du jeu
    const solveFile = []

    const mapSize = map.get_MapSize()

    solveFile.push(`C - ${mapSize.x} - ${mapSize.y}`)
    map.get_Mountains().forEach((each) => solveFile.push(`M - ${each.x} - ${each.y}`))
    map.get_Treasure().forEach((each) => solveFile.push(`T - ${each.x} - ${each.y} - ${each.treasureCount}`))
    map.get_Adventurer().forEach((each) => solveFile.push(`A - ${each.name} - ${each.x} - ${each.y} - ${each.direction} - ${each.treasureCount}`))

    //écriture dans le fichier de résultat avec le formattage juste au dessus
    if (FileWriter(`${settings.gameFolder}/solve_${file}`, solveFile)) {
        console.log('\x1b[32m\u2713', `Résultat trouvable dans le fichier : ${settings.gameFolder}/solve_${file}`)
    }
    else {
        console.log('\x1b[31m\u26a0', `Une erreur est survenu le fichier n'a pas pu être créer au nom suivant : ${settings.gameFolder}/solve_${file}`)
    }
}