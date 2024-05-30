class Character {                          // Character is a Superclass
    constructor(name) {                    // every new player starts with the following stats
        this.name = name;
        this.hp = 6;
        this.speed = 1;
        this.damage = 1;
        this.ac = 1;
        this.range = 2;
        this.position = [4, 0];             // Represent the actual position of a Character in the bidimensional array (Map of levels)
    }
    // Getters methods
    get getHp() {
        return this.hp;
    }
    get getPosition() {
        return this.position;
    }
    // Setters methods
    /**
     * @param {number} damage
     */
    set reduceHp(damage) {
        this.hp -= damage;
    }
    /**
     * @param {any[]} position
     */
    set move(position) {
        this.position = [position[0], position[1]];
    }
    attack(enemy, damageModifier) {
        enemy.reduceHp((this.damage + damageModifier));
        return enemy;
    }
}

class Enemy extends Character {            // Each Enemy has different stats from each other and spawns in different cells
    constructor(name, hp, speed, damage, ac, range, position) {
        super(name);
        this.hp = hp;
        this.speed = speed;
        this.damage = damage;
        this.ac = ac;
        this.range = range;
        this.position = position;
    }
    move() {
        // to do
    }
    attack() {
        // to do
    }
}

class Paladin extends Character {           // Once per Dungeon Level you
    constructor(name) {                     // may leave one Energy Dice in
        super(name);                        // place from last turn
        this.abilityUsed = false;
    }
    useSpecialAbility(energyDiece, stat) {
        let oldEnergyDiece;
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            switch(stat) {
                case 1: oldEnergyDiece = [energyDiece + this.speed, 1];
                    break;
                case 2: oldEnergyDiece = [energyDiece + this.damage, 2];
                    break;
                case 3: oldEnergyDiece = [energyDiece + this.ac, 3];
                    break;
                default: oldEnergyDiece = false;
            }
        }
        return oldEnergyDiece;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Wizard extends Character {            // Once per Dungeon Level you
    constructor(name) {                     // may reroll all Energy dice
        super(name);
        this.abilityUsed = false;
    }
    useSpecialAbility() {
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            for(let i = 0; i < 3; i++) {
                dice[i] = Math.floor(Math.random() * 6) + 1;
            }
        }
        return dice;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Ranger extends Character {            // Once per Dungeon Level you
    constructor(name) {                     // may assign a die to Range
        super(name);                        // instead of Speed
        this.abilityUsed = false;
    }
    useSpecialAbility(movementDice) {
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            rangeDice = movementDice + this.range;
        }
        return rangeDice;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Barbarian extends Character {         // Once per turn, you may
    constructor(name) {                     // choose to reroll all dice when
        super(name);                        // on 1 Health
        this.abilityUsed = false;
    }
    useSpecialAbility() {
        if((this.hp != 1) || this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            for(let i = 0; i < 3; i++) {
                dice[i] = Math.floor(Math.random() * 6) + 1;
            }
        }
        return dice;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Rogue extends Character {             // Once per Dungeon Level
    constructor(name) {                     // you may increase the value of
        super(name);                        // all Energy dice rolled by 1
        this.abilityUsed = false;
    }
    useSpecialAbility(dice) {
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            for(let i = 0; i < 3; i++) {
                dice[i]++;
            }
        }
        return dice;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Knight extends Character {            // Once per Dungeon Level
    constructor(name) {                     // you may assign 2 Energy
        super(name);                        // dice of the same value
        this.abilityUsed = false;
    }
    useSpecialAbility(energyDice1, energyDice2) {
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            energyDice2 = energyDice1;
        }
        return energyDice2;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Cleric extends Character {            // If you roll the same number
    constructor(name) {                     // with all Energy dice, you can
        super(name);                        // increase it by 2 (max.6)
    }
    useSpecialAbility(dice) {
        const allEqual = arr => arr.every( v => v === arr[0] )
        if(!(allEqual(dice))) {
            return false;
        }
        else {
            this.abilityUsed = true;
            if(dice[0] >= 5) {
                for(let i = 0; i < 3; i++) {
                    dice[i] = 6;
                }
            }
            else {
                for(let i = 0; i < 3; i++) {
                    dice[i] += 2;
                }
            }
        }
        return dice;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

class Necromancer extends Character {
    constructor(name) {                    // Once per Dungeon Level
        super(name);                       // you may choose to lose
        this.abilityUsed = false;          // 1 HP to inflict 1 Damage 
    }
    useSpecialAbility(enemy) {
        if(this.abilityUsed) {
            return false;
        }
        else {
            this.abilityUsed = true;
            this.hp--;
            enemy.hp--;
        }
        return enemy;
    }
    levelUp(stat) {
        switch(stat) {
            case 1: this.speed++;
                break;
            case 2: this.damage++;
                break;
            case 3: this.ac++;
                break;
            case 4: this.range++;
                break;
            default: console.log("An Error occured on levelling method");
        }
    }
    rest() {
        this.hp = 6;
    }
}

module.exports = {Enemy, Paladin, Wizard, Ranger, Barbarian, Rogue, Knight, Cleric, Necromancer};