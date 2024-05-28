const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
let {dungeon} = require('./dungeon');
const character = require('./creatures/characters');

const LevelOrder = [0, 1, 2, 3, 0, 4, 5, 3, 2, 1, 5, 6];
let win = false;
let player = new character.Wizard('Luca');
let currentLevel = 0;

/*
do {

    currentLevel++;
} while((player.getHp > 0) && (win === false));

function enterLevel(level, dungeon) {
    switch (level) {
        case 0:
            dungeon[0][0][3] = new character.Enemy(?);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            break;
        default: console.log("Error at level index!");
        return dungeon;
    }
}*/