# Projet - La carte aux trésors

A partir d'un fichier texte créer une carte et y faire déplacer un ou des aventuriers pour récolter des trésors

Format du fichier example:

```bash
# C => Carte - Number => x - Number => y
C - 3 - 4

# M => Montagne - Number => x - Number => y
M - 1 - 1

# T => Trésor - Number => x - Number => y - Number => nombre de trésor
T - 0 - 3 - 2

# A => Aventurier - Number => x - Number => y - Number => nombre de trésor - String => orientation (N/S/O/E) - String action (A/D/G)
A - Lara - 1 - 1 - S - AADADAGGA
```

## Installation

Install carte-au-tresor with npm

```bash
  git clone https://github.com/Shycin/carte-au-tresor.git
  cd carte-au-tresor
  npm i
```

## New Game

### Installation d'une nouvelle partie

-   Localiser le dossier "game" à la racine du projet
-   Ajouter un nouveau fichier text commençant par "game\_"
-   Remplir le fichier avec au moins une ligne Carte et Aventurier sinon la partie est ignoré

> !!! Attention, veillez à avoir des positions possible, ex : si la carte fais 1 par 1, la seule position possible serait pour x: 0 et y: 0

-   Une montagne ne peut pas être créer sur une case montagne/aventurier ou en dehors de la carte
-   Un aventurier ne peut pas être créer sur une case montagne/aventurier ou en dehors de la carte
-   Une case trésor peut apparaitre sur n'importe quelle case de la carte hors case avec déjà un trésor présent mais peut ne pas être accessible si celle-ci est situé sur une montagne

### Déroulement d'une partie

-   Au Lancement un message dans la console apparait pour confirmer le bon lancement d'une partie : "ℹ Début nouvelle partie avec le fichier..."
-   A l'initialisation d'une partie chaque aventurier est placé dans une liste d'attente en fonction de son ordre d'arrivé dans le fichier du jeu
-   La partie dure tant que chaque aventurier n'a pas exécuter tout les instructions qui lui sont données dans le fichier du jeu
-   Si une action n'est pas réalisable celle-ci est ignoré et passe à l'aventurier suivant ou sinon au tour suivant
-   L'aventurier va effectuer soit un tour de 90° à droite ou à gauche ou avancer d'une case
-   L'action avancer est ignoré si la prochaine case se trouve être une montagne, un aventurier ou une limite de la carte
-   Si un trésor se trouve sur la nouvelle case, l'aventurier reçoit un trésor supplémentaire, cela déduit de 1 le compteur du trésor concerné
-   Une fois la partie finis un message dans la console apparait pour confirmer l'arrêt de la partie: "✓ Résultat trouvable dans le fichier..."
-   Si une erreur : "⚠ Une erreur est survenu le fichier n'a pas pu être créer au nom suivant..."
    Le fichier de résultat est trouvable dans le dossier "game" avec un préfix "solve\_" devant, ex : "game_01.txt" => "solve_game_01.txt"  
    Le nom de fichier pour le résultat est donnée via dans la console

### Résultat d'une partie

-   Dans le fichier apparait la carte et les différentes montagnes/trésors/aventuriers qui étaient valide à l'origine dans le fichier de lancement
-   Les trésors avec un compteur de 0 n'apparaissent pas

#### Exemple:

Un bon fichier

```bash
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3
A - Lara - 1 - 1 - S - AADADAGGA
```

donne celui-ci en résultat

```bash
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 1 - 3 - 2
A - Lara - 0 - 3 - S - 3
```

Un mauvais fichier où une montagne et un aventurier sont hors carte

```bash
C - 1 - 1
M - 0 - 0
M - 5 - 5
A - Lara - 1 - 1 - S - AADADAGGA
```

donne celui-ci en résultat

```bash
C - 1 - 1
M - 0 - 0
```

## Run app

Lancement de toute les parties trouvable dans le dossier

```bash
  npm run dev
```

## Running Tests

Démarrer un test simple

```bash
  npm run test
```

Démarrer un test avec coverage

```bash
  npm run coverage
```

## Demo

https://stackblitz.com/~/github.com/Shycin/carte-au-tresor

## Coverage

![App Screenshot](https://i.imgur.com/17zVFzV.png)

## Authors

-   [@Jacques A](https://github.com/Shycin)
