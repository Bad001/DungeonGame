// Constants
const {bosses} = require('./creatures/enemies/bosses');
const {minions} = require('./creatures/enemies/minions');
const dungeon = require('./dungeon');
const character = require('./creatures/characters');
const pathfinding = require('./astar');

class Game {
    constructor(socket) {
        // Variables / Objects
        this.player = null;
        this.enemies = [];
        this.currentLevelDungeon = [];
        this.energyDice = [0,0,0];
        this.assignedStats = [0,0,0];
        this.originalSpeed = 0;
        this.originalDamage = 0;
        // Indexes
        this.currentLevelIndex = 0;
        // Flags
        this.isEnergyPhase = false;
        this.isFirstTurn = true;
        // Socket
        this.socket = socket;
    }

    enterLevel() { // Presets method
        this.currentLevelDungeon = [];
        this.enemies = [];
        let enemy = {};
        switch (this.currentLevelIndex) {
            case 0:
                enemy = minions[0];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,4]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[2][4]);
                break;
            case 1:
                enemy = minions[1];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,2]);
                this.currentLevelDungeon[1][0] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [1,0]);
                this.enemies.push(this.currentLevelDungeon[0][2]);
                this.enemies.push(this.currentLevelDungeon[1][0]);
                break;
            case 2:
                enemy = bosses[0];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 3:
                enemy = minions[3];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,1]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                break;
            case 4:
                enemy = minions[0];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[0]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,1]);
                this.currentLevelDungeon[1][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [1,4]);
                this.currentLevelDungeon[4][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [4,4]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                this.enemies.push(this.currentLevelDungeon[1][4]);
                this.enemies.push(this.currentLevelDungeon[4][4]);
                break;
            case 5:
                enemy = bosses[1];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[4]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 6:
                enemy = minions[2];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[1][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [1,2]);
                this.currentLevelDungeon[3][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [3,4]);
                this.enemies.push(this.currentLevelDungeon[1][2]);
                this.enemies.push(this.currentLevelDungeon[3][4]);
                break;
            case 7:
                enemy = minions[3];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[3]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][3] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,3]);
                this.currentLevelDungeon[4][1] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [4,1]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[4][1]);
                break;
            case 8:
                enemy = bosses[2];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[2]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 9:
                enemy = minions[1];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[1]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[0][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,4]);
                this.currentLevelDungeon[1][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [1,2]);
                this.currentLevelDungeon[2][1] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,1]);
                this.currentLevelDungeon[3][0] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [3,0]);
                this.enemies.push(this.currentLevelDungeon[0][4]);
                this.enemies.push(this.currentLevelDungeon[1][2]);
                this.enemies.push(this.currentLevelDungeon[2][1]);
                this.enemies.push(this.currentLevelDungeon[3][0]);
                break;
            case 10:
                enemy = minions[2];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[5]));
                this.player.move = [4,0];
                this.currentLevelDungeon[4][0] = this.player;
                this.currentLevelDungeon[0][1] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,1]);
                this.currentLevelDungeon[0][3] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [0,3]);
                this.currentLevelDungeon[2][4] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,4]);
                this.enemies.push(this.currentLevelDungeon[0][1]);
                this.enemies.push(this.currentLevelDungeon[0][3]);
                this.enemies.push(this.currentLevelDungeon[2][4]);
                break;
            case 11:
                enemy = bosses[3];
                this.currentLevelDungeon = JSON.parse(JSON.stringify(dungeon[6]));
                this.player.move = [4,4];
                this.currentLevelDungeon[4][4] = this.player;
                this.currentLevelDungeon[2][2] = new character.Enemy(enemy.name, enemy.hp, enemy.speed, enemy.damage, enemy.ac, enemy.range, [2,2]);
                this.enemies.push(this.currentLevelDungeon[2][2]);
                break;
            case 12:
                // Here will go the query to save the game outcome of player in DB
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
                    this.originalDamage = this.player.getDamage;
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
                                if(this.player.getDamage < this.enemies[0].getAc) {
                                    this.socket.emit('playerPhase', 'Your Damage is too low!');
                                }
                                else {
                                    const result = this.player.attack(this.currentLevelDungeon[coordinates[0]][coordinates[1]]);
                                    this.currentLevelDungeon[coordinates[0]][coordinates[1]] = result['target'];
                                    this.player.setDamage = this.player.getDamage - (this.currentLevelDungeon[coordinates[0]][coordinates[1]].getAc * result['damageInflicted']);
                                    if(this.currentLevelDungeon[coordinates[0]][coordinates[1]].getHp <= 0) {
                                        const index = this.enemies.indexOf(this.currentLevelDungeon[coordinates[0]][coordinates[1]]);
                                        this.enemies.splice(index, 1);
                                        this.currentLevelDungeon[coordinates[0]][coordinates[1]] = 0;
                                    }
                                    this.socket.emit('playerPhase', this.currentLevelDungeon, this.player);
                                }
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
        let lineOfSight;
        let attackResult;
        let playerVisible = false;
        let totalDamage = 0;
        for(let i = 0; i < this.enemies.length; i++) {
            lineOfSight = pathfinding.lineOfSight(this.currentLevelDungeon, this.enemies[i].getPosition, this.player.getPosition);
            if((this.enemies[i].getRange - lineOfSight['totalCost']) >= 0) {
                playerVisible = true;
                totalDamage += this.enemies[i].getDamage;
            }
        }
        if(playerVisible) {
            attackResult = this.enemies[0].attack(this.player, totalDamage);
            this.player = attackResult['target'];
        }
        this.player.setSpeed = this.originalSpeed;
        this.player.setDamage = this.originalDamage;
        this.player.setAc =  this.player.getAc - this.assignedStats[2];
        this.assignedStats = [0,0,0];
        this.socket.emit('enemyPhase', this.currentLevelDungeon, this.player);
    }
    
    levelUpOrRest() {
        return new Promise((resolve) => {
            this.socket.emit('levelUpOrRest', true);
            this.socket.once('levelUpOrRest', (data) => {
                console.log(data);
                const levelUp = data[0];
                const stat = data[1];
                if(levelUp) {
                    this.player.levelUp(stat);
                }
                else {
                    this.player.rest();
                }
                this.socket.emit('levelUpOrRest', false);
                resolve();
            });
        });
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
                    this.levelUpOrRest()
                    .then(() => {return this.enterLevel()})
                    .then(() => {resolve(this.startGame())})
                    .catch(error => console.log(error));
                }
            }
            else {
                resolve(this.currentLevelIndex === 12 ? 'You Win!' : 'You Lose!');
            }
        });
    }
}

module.exports = {Game};