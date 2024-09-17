// Constants
const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
const dungeon = require('./dungeon');
const character = require('./creatures/characters');

class Game {
    constructor(socket) {
        // Variables / Object
        this.player = null;
        this.currentLevelDungeon = [];
        this.energyDice = [0,0,0];
        this.assignedStats = [0,0,0];
        // Indexes
        this.currentLevelIndex = 0;
        this.numberOfEnemies = 0;
        // Flags
        this.levelUp = false;
        this.isEnergyPhase = false;
        this.isFirstTurn = true;
        // Socket
        this.socket = socket;
    }

    enterLevel() { // Presets method
        let currentEnemy;
        this.currentLevelDungeon = [];
        switch (this.currentLevelIndex) {
            case 0:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [2,4]);
                this.numberOfEnemies = 2;
                currentEnemy = this.currentLevelDungeon[0][3];
                break;
            case 1:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,2]);
                this.currentLevelDungeon[1][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,0]);
                this.numberOfEnemies = 2;
                currentEnemy = this.currentLevelDungeon[0][2];
                break;
            case 2:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[0].name, bosses[0].hp, bosses[0].speed, bosses[0].damage, bosses[0].ac, bosses[0].range, [2,2]);
                this.numberOfEnemies = 1;
                currentEnemy = this.currentLevelDungeon[2][2];
                break;
            case 3:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,1]);
                this.numberOfEnemies = 1;
                currentEnemy = this.currentLevelDungeon[0][1];
                break;
            case 4:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,1]);
                this.currentLevelDungeon[1][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [1,4]);
                this.currentLevelDungeon[4][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [4,4]);
                this.numberOfEnemies = 3;
                currentEnemy = this.currentLevelDungeon[0][1];
                break;
            case 5:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[4]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[1].name, bosses[1].hp, bosses[1].speed, bosses[1].damage, bosses[1].ac, bosses[1].range, [2,2]);
                this.numberOfEnemies = 1;
                currentEnemy = this.currentLevelDungeon[2][2];
                break;
            case 6:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[1][2] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [1,2]);
                this.currentLevelDungeon[3][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [3,4]);
                this.numberOfEnemies = 2;
                currentEnemy = this.currentLevelDungeon[1][2];
                break;
            case 7:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,3]);
                this.currentLevelDungeon[4][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [4,1]);
                this.numberOfEnemies = 2;
                currentEnemy = this.currentLevelDungeon[0][3];
                break;
            case 8:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[2].name, bosses[2].hp, bosses[2].speed, bosses[2].damage, bosses[2].ac, bosses[2].range, [2,2]);
                this.numberOfEnemies = 1;
                currentEnemy = this.currentLevelDungeon[2][2];
                break;
            case 9:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][4] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,4]);
                this.currentLevelDungeon[1][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,2]);
                this.currentLevelDungeon[2][1] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [2,1]);
                this.currentLevelDungeon[3][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [3,0]);
                this.numberOfEnemies = 4;
                currentEnemy = this.currentLevelDungeon[0][4];
                break;
            case 10:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,1]);
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [2,4]);
                this.numberOfEnemies = 3;
                currentEnemy = this.currentLevelDungeon[0][1];
                break;
            case 11:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[6]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[3].name, bosses[3].hp, bosses[3].speed, bosses[3].damage, bosses[3].ac, bosses[3].range, [2,2]);
                this.numberOfEnemies = 1;
                currentEnemy = this.currentLevelDungeon[2][2];
                break;
            default: console.log("Error at enterLevel function!");
        }
        console.log(this.currentLevelDungeon);
        this.socket.emit('presets', this.currentLevelDungeon, currentEnemy, this.currentLevelIndex);
    }

    energyPhase() {
        return new Promise((resolve, reject) => {
            for(let i = 0; i < 3; i++) {
                this.energyDice[i] = Math.floor(Math.random() * 6) + 1;
            }
            this.isEnergyPhase = true;
            this.socket.emit('energyPhase', this.energyDice);
            this.socket.once('assignedStats', (data) => {
                this.assignedStats = data;
                if(data.includes(0)) {
                    reject('User not ready');
                }
                else {
                    resolve(console.log(this.assignedStats));
                }
            });
        });
    }

    playerPhase() {
        this.isEnergyPhase = false;
        console.log('player phase');
    }

    enemyMovementPhase() {
        console.log('enemy mov phase');
    }
    
    enemyAttackPhase() {
        console.log('enemy attack phase');
    }
    
    levelUpOrRest() {
        if(levelUp) {
            this.player.levelUp(/*from 0 to 3 to choose the stat*/);
        }
        else {
            this.player.rest();
        }
    }

    startGame(role) {
        return new Promise((resolve) => {
            if(this.isFirstTurn) {
                this.player = new character[role]();
                this.isFirstTurn = false;
                this.enterLevel();
            }
            else {
                this.enterLevel();
            }
            if(this.currentLevelIndex < 12) {//(this.player.getHp > 0) && (this.currentLevelIndex < 12)) {
                if(this.numberOfEnemies != 0) {
                    this.energyPhase()
                    .then(() => {return this.playerPhase()})
                    .then(() => {return this.enemyMovementPhase()})
                    .then(() => {return this.enemyAttackPhase()})
                    .then(() => {resolve(this.startGame())})
                    .catch(error => console.log(error));
                    this.currentLevelIndex++;
                }
                else {
                    this.currentLevelIndex++;
                    this.levelUpOrRest();
                    this.enterLevel();
                    resolve(this.startGame());
                }
            }
            else {
                resolve(this.currentLevelIndex === 12 ? 'You Win!' : 'You Lose!');
            }
        });
    }
}

module.exports = {Game};