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

## Run app

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Demo

https://stackblitz.com/~/github.com/Shycin/carte-au-tresor

## Authors

-   [@Jacques A](https://github.com/Shycin)
