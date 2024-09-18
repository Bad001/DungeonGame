// Constants
const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
const dungeon = require('./dungeon');
const character = require('./creatures/characters');
const {astar} = require('./astar');

class Game {
    constructor(socket) {
        // Variables / Object
        this.player = null;
        this.currentLevelDungeon = [];
        this.energyDice = [0,0,0];
        this.assignedStats = [0,0,0];
        this.originalSpeed = 0;
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
        this.socket.emit('presets', this.currentLevelDungeon, this.currentLevelIndex, currentEnemy, this.numberOfEnemies, this.player);
    }

    energyPhase() {
        return new Promise((resolve, reject) => {
            console.log('Energy Phase of Player ' + this.socket.id);
            for(let i = 0; i < 3; i++) {
                this.energyDice[i] = Math.floor(Math.random() * 6) + 1;
            }
            this.isEnergyPhase = true;
            this.socket.emit('energyPhase', this.isEnergyPhase, this.energyDice);
            this.socket.once('assignedStats', (data) => {
                this.assignedStats = data[0];
                if(data[0].includes(0)) {
                    reject('An error occured at Energy Phase!');
                }
                else {
                    this.isEnergyPhase = false;
                    this.originalSpeed = this.player.getSpeed;
                    this.player.setSpeed = this.assignedStats[0] + this.player.getSpeed;
                    this.player.setDamage = this.assignedStats[1] + this.player.getDamage;
                    this.player.setAc = this.assignedStats[2] + this.player.getAc;
                    this.socket.emit('energyPhase', this.isEnergyPhase, this.player);
                    resolve(console.log(this.assignedStats + ' assigned stats of Player ' + this.socket.id));
                }
            });
        });
    }

    playerPhase() {
        return new Promise((resolve) => {
            console.log('Player phase of Player ' + this.socket.id);
            this.socket.on('playerPhase', (data) => {
                const endPhase = data[0];
                const action = data[1];
                const coordinates = data[2];
                if(endPhase) {
                    resolve();
                }
                switch(action) {
                    case 'move':
                        if(this.currentLevelDungeon[coordinates[0]][coordinates[1]] === 0) {
                            const path = astar(this.currentLevelDungeon, this.player.getPosition, coordinates);
                            console.log(path);
                            if((this.player.getSpeed - path['totalMovementCost']) >= 0) {
                                this.currentLevelDungeon[this.player.getPosition[0]][this.player.getPosition[1]] = 0;
                                this.player.move = coordinates;
                                this.currentLevelDungeon[this.player.getPosition[0]][this.player.getPosition[1]] = this.player;
                                this.player.setSpeed = (this.player.getSpeed - path['totalMovementCost']);
                                this.socket.emit('playerPhase', this.currentLevelDungeon, this.player);
                            }
                            else {
                                this.socket.emit('playerPhase', 'You don\'t have enough mov speed points to go there!');    
                            }
                        }
                        else {
                            this.socket.emit('playerPhase', 'You can\'t go in that direction!');
                        }
                        break;
                    case 'attack':
                        if(this.currentLevelDungeon[coordinates[0]][coordinates[1]] instanceof character.Enemy) {
                            this.socket.emit('playerPhase', this.currentLevelDungeon);
                        }
                        else {
                            this.socket.emit('playerPhase', 'You can\'t attack that!');
                        }
                        break;
                    default: 'An error occured on playerPhase - actions';
                }
            });
        });
    }

    enemyMovementPhase() {
        this.socket.removeAllListeners('playerPhase');
        let enemies = [];
        console.log('Enemy movement phase of Player ' + this.socket.id);
        for(let i = 0; i < this.currentLevelDungeon.length; i++) {
            for(let j = 0; j < this.currentLevelDungeon.length; j++) {
                if(this.currentLevelDungeon[i][j] instanceof character.Enemy) {
                    enemies.push(this.currentLevelDungeon[i][j]);
                }
            }
        }
        console.log(enemies);
        /*
        for(let i = 0; i < enemies.length; i++) {
            let path = astar(this.currentLevelDungeon, enemies[i], );
        }
        */
        this.socket.emit('enemyPhase', this.currentLevelDungeon);
    }
    
    enemyAttackPhase() {
        console.log('Enemy attack phase of Player ' + this.socket.id);
        this.player.setSpeed = this.originalSpeed;
        this.player.setDamage = this.player.getDamage - this.assignedStats[1];
        this.player.setAc =  this.player.getAc - this.assignedStats[2];
        this.assignedStats = [0,0,0];
        this.socket.emit('enemyPhase', this.currentLevelDungeon, this.player);
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
            if((this.player.getHp > 0) && (this.currentLevelIndex < 12)) {
                if(this.numberOfEnemies != 0) {
                    this.energyPhase()
                    .then(() => {return this.playerPhase()})
                    .then(() => {return this.enemyMovementPhase()})
                    .then(() => {return this.enemyAttackPhase()})
                    .then(() => {resolve(this.startGame())})
                    .catch(error => console.log(error));
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