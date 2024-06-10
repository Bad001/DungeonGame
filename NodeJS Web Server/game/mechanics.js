// Constants
const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
const {dungeon} = require('./dungeon');
const character = require('./creatures/characters');

// Variables
let player = new character.Wizard('Luca');  // I will need Websockets for this
let currentLevelIndex = 0;
let numberOfEnemies = 0;
let currentLevelDungeon = [];
let energyDice = [0,0,0];
let levelUp = 0;

// Game
enterLevel();
do {
    if(numberOfEnemies != 0) {
        energyPhase();
        playerPhase();
        enemyMovementPhase();
        enemyAttackPhase();
    }
    else {    
        currentLevelIndex++;
        levelUpOrRest();
        enterLevel();
    }
} while((player.getHp > 0) && (currentLevelIndex < 12));
currentLevelIndex === 12 ? console.log("You Win!") : console.log("You Lose!");

// Functions
function enterLevel() {
    switch (currentLevelIndex) {
        case 0:
            currentLevelDungeon = dungeon[0];
            player.move([4,0]);
            currentLevelDungeon[4][0] = player;
            currentLevelDungeon[0][3] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,3]);
            currentLevelDungeon[2][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [2,4]);
            numberOfEnemies = 2;
            break;
        case 1:
            currentLevelDungeon = dungeon[1];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[0][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,2]);
            currentLevelDungeon[1][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,0]);
            numberOfEnemies = 2;
            break;
        case 2:
            currentLevelDungeon = dungeon[2];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[2][2] = new character.Enemy(bosses[0].name, bosses[0].hp, bosses[0].speed, bosses[0].damage, bosses[0].ac, bosses[0].range, [2,2]);
            numberOfEnemies = 1;
            break;
        case 3:
            currentLevelDungeon = dungeon[3];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[0][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,1]);
            numberOfEnemies = 1;
            break;
        case 4:
            currentLevelDungeon = dungeon[0];
            player.move([4,0]);
            currentLevelDungeon[4][0] = player;
            currentLevelDungeon[0][1] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,1]);
            currentLevelDungeon[1][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [1,4]);
            currentLevelDungeon[4][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [4,4]);
            numberOfEnemies = 3;
            break;
        case 5:
            currentLevelDungeon = dungeon[4];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[2][2] = new character.Enemy(bosses[1].name, bosses[1].hp, bosses[1].speed, bosses[1].damage, bosses[1].ac, bosses[1].range, [2,2]);
            numberOfEnemies = 1;
            break;
        case 6:
            currentLevelDungeon = dungeon[5];
            player.move([4,0]);
            currentLevelDungeon[4][0] = player;
            currentLevelDungeon[1][2] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [1,2]);
            currentLevelDungeon[3][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [3,4]);
            numberOfEnemies = 2;
            break;
        case 7:
            currentLevelDungeon = dungeon[3];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[0][3] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,3]);
            currentLevelDungeon[4][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [4,1]);
            numberOfEnemies = 2;
            break;
        case 8:
            currentLevelDungeon = dungeon[2];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[2][2] = new character.Enemy(bosses[2].name, bosses[2].hp, bosses[2].speed, bosses[2].damage, bosses[2].ac, bosses[2].range, [2,2]);
            numberOfEnemies = 1;
            break;
        case 9:
            currentLevelDungeon = dungeon[1];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[0][4] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,4]);
            currentLevelDungeon[1][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,2]);
            currentLevelDungeon[2][1] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [2,1]);
            currentLevelDungeon[3][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [3,0]);
            numberOfEnemies = 4;
            break;
        case 10:
            currentLevelDungeon = dungeon[5];
            player.move([4,0]);
            currentLevelDungeon[4][0] = player;
            currentLevelDungeon[0][1] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,1]);
            currentLevelDungeon[0][3] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,3]);
            currentLevelDungeon[2][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [2,4]);
            numberOfEnemies = 3;
            break;
        case 11:
            currentLevelDungeon = dungeon[6];
            player.move([4,4]);
            currentLevelDungeon[4][4] = player;
            currentLevelDungeon[2][2] = new character.Enemy(bosses[3].name, bosses[3].hp, bosses[3].speed, bosses[3].damage, bosses[3].ac, bosses[3].range, [2,2]);
            numberOfEnemies = 1;
            break;
        default: console.log("Error at enterLevel function!");
    }
}

function energyPhase() {
    for(let i = 0; i < 3; i++) {
        energyDice[i] = Math.floor(Math.random() * 6) + 1;
    }
    // Here goes a blocking function (The user interacts)
}

function playerPhase() {
    // Here goes a blocking function (The user interacts)
}

function enemyMovementPhase() {
    console.log("enemy movement phase");
}

function enemyAttackPhase() {
    console.log("enemy attack phase");
}

function levelUpOrRest() {
    if(levelUp) {
        player.levelUp(/*from 1 to 4 to choose the stat*/);
    }
    else {
        player.rest();
    }
}