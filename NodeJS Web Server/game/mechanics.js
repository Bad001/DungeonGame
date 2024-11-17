// Constants
const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
const dungeon = require('./dungeon');
const character = require('./creatures/characters');
const pathfinding = require('./astar');

class Game {
    constructor(socket) {
        // Variables / Object
        this.player = null;
        this.enemies = [];
        this.currentLevelDungeon = [];
        this.energyDice = [0,0,0];
        this.assignedStats = [0,0,0];
        this.originalSpeed = 0;
        // Indexes
        this.currentLevelIndex = 0;
        // Flags
        this.levelUp = false;
        this.isEnergyPhase = false;
        this.isFirstTurn = true;
        // Socket
        this.socket = socket;
    }

    enterLevel() { // Presets method
        this.currentLevelDungeon = [];
        this.enemies = [];
        switch (this.currentLevelIndex) {
            case 0:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [2,4]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[2][4]);
                break;
            case 1:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,2]);
                this.currentLevelDungeon[1][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,0]);
                this.enemies.push(this.currentLevelDungeon[0][2]);
                this.enemies.push(this.currentLevelDungeon[1][0]);
                break;
            case 2:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[0].name, bosses[0].hp, bosses[0].speed, bosses[0].damage, bosses[0].ac, bosses[0].range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 3:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,1]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                break;
            case 4:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [0,1]);
                this.currentLevelDungeon[1][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [1,4]);
                this.currentLevelDungeon[4][4] = new character.Enemy(minions[0].name, minions[0].hp, minions[0].speed, minions[0].damage, minions[0].ac, minions[0].range, [4,4]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                this.enemies.push(this.currentLevelDungeon[1][4]);
                this.enemies.push(this.currentLevelDungeon[4][4]);
                break;
            case 5:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[4]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[1].name, bosses[1].hp, bosses[1].speed, bosses[1].damage, bosses[1].ac, bosses[1].range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 6:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[1][2] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [1,2]);
                this.currentLevelDungeon[3][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [3,4]);
                this.enemies.push(this.currentLevelDungeon[1][2]);
                this.enemies.push(this.currentLevelDungeon[3][4]);
                break;
            case 7:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [0,3]);
                this.currentLevelDungeon[4][1] = new character.Enemy(minions[3].name, minions[3].hp, minions[3].speed, minions[3].damage, minions[3].ac, minions[3].range, [4,1]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[4][1]);
                break;
            case 8:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[2].name, bosses[2].hp, bosses[2].speed, bosses[2].damage, bosses[2].ac, bosses[2].range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 9:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][4] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [0,4]);
                this.currentLevelDungeon[1][2] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [1,2]);
                this.currentLevelDungeon[2][1] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [2,1]);
                this.currentLevelDungeon[3][0] = new character.Enemy(minions[1].name, minions[1].hp, minions[1].speed, minions[1].damage, minions[1].ac, minions[1].range, [3,0]);
                this.enemies.push(this.currentLevelDungeon[0][4]);
                this.enemies.push(this.currentLevelDungeon[1][2]);
                this.enemies.push(this.currentLevelDungeon[2][1]);
                this.enemies.push(this.currentLevelDungeon[3][0]);
                break;
            case 10:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,1]);
                this.currentLevelDungeon[0][3] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(minions[2].name, minions[2].hp, minions[2].speed, minions[2].damage, minions[2].ac, minions[2].range, [2,4]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[2][4]);
                break;
            case 11:
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[6]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(bosses[3].name, bosses[3].hp, bosses[3].speed, bosses[3].damage, bosses[3].ac, bosses[3].range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            default: console.log("Error at enterLevel function!");
        }
        this.socket.emit('presets', this.currentLevelDungeon, this.currentLevelIndex, this.enemies[0], this.player);
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
                            const path = pathfinding.astar(this.currentLevelDungeon, this.player.getPosition, coordinates, this.player.getSpeed);
                            console.log(path);
                            if((this.player.getSpeed - path['totalMovementCost']) >= 0) {
                                this.currentLevelDungeon[this.player.getPosition[0]][this.player.getPosition[1]] = 0;
                                this.player.move = path['path'].slice(-1)[0];
                                this.currentLevelDungeon[this.player.getPosition[0]][this.player.getPosition[1]] = this.player;
                                this.player.setSpeed = (this.player.getSpeed - path['totalMovementCost']);
                                this.socket.emit('playerPhase', this.currentLevelDungeon, this.player);
                            }
                            if(path['totalMovementCost'] === 0) {
                                this.socket.emit('playerPhase', 'You can\'t reach that position!');
                            }
                        }
                        else {
                            this.socket.emit('playerPhase', 'You can\'t stay on walls or enemies!');
                        }
                        break;
                    case 'attack':
                        if(this.currentLevelDungeon[coordinates[0]][coordinates[1]] instanceof character.Enemy) {
                            const lineOfSight = pathfinding.lineOfSight(this.currentLevelDungeon, this.player.getPosition, coordinates);
                            console.log(lineOfSight);
                            if((this.player.getRange - lineOfSight['totalCost']) >= 0) {
                                this.currentLevelDungeon[coordinates[0]][coordinates[1]] = this.player.attack(this.currentLevelDungeon[coordinates[0]][coordinates[1]]);
                                this.socket.emit('playerPhase', this.currentLevelDungeon);
                            }
                            else {
                                this.socket.emit('playerPhase', 'You can\'t reach that position!');
                            }
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
        let bestPaths = [];
        console.log('Enemy movement phase of Player ' + this.socket.id);
        for(let i = 0; i < this.enemies.length; i++) {
            bestPaths.push(pathfinding.astar(this.currentLevelDungeon, this.enemies[i].getPosition, this.player.getPosition, this.enemies[i].getSpeed));
            console.log(bestPaths[i]);
            if(bestPaths[i].totalMovementCost != 0) {
                this.currentLevelDungeon[this.enemies[i].getPosition[0]][this.enemies[i].getPosition[1]] = 0;
                this.enemies[i].move = bestPaths[i].path.slice(-1)[0];
                this.currentLevelDungeon[this.enemies[i].getPosition[0]][this.enemies[i].getPosition[1]] = this.enemies[i];
            }
        }
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
                if(this.enemies.length != 0) {
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