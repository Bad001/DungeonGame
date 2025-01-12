import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CharacterComponent } from "./character/character.component";
import { ReplaceNumberWithDiceDirective } from '../../directives/replace-number-with-dice.directive';
import { RenderGameMapDirective } from '../../directives/render-game-map.directive';
import { GameService } from '../../services/game.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [NgFor, RouterModule, NgIf, CharacterComponent, ReplaceNumberWithDiceDirective, RenderGameMapDirective ]
})

export class GameComponent implements OnDestroy {
  // Choose Character Objects
  character: { name: string, description: string } = { name: '', description: ''};
  characters: { name: string, description: string }[] = this.GameService.getCharacters();
  // Flags
  isCharacterBeenChosen: boolean = false;
  isEnergyPhase: boolean = false;
  isDieButtonPressed: boolean = false;
  levelUpOrRest: boolean = false;
  levelUp: boolean = false;
  rest: boolean = false;
  canUseSpecialAbility:boolean = true;
  rangerAbilityUsed:boolean = false;
  necromancerAbilityUsed:boolean = true;
  paladinAbilityUsed:boolean = false;
  knightAbilityUsed:boolean = false;
  // Client will send this data to Server  | Client --> Server
  assignedStats = [0,0,0];
  die: number = 0;
  coordinates: number[] = [];
  playerAction: string = '';
  stat: string = '';
  statToLevelUp: number = 4;
  rangeModifier: number = 0;
  // Client will listen to retrieve this data from Server  | Client <-- Server
  lastTurnAssignedStats = [0,0,0];
  energyDice: any[] = [];   // Random energyDice for energyDice Phase
  dungeon:any [] = [];      // Map of the current dungeon
  dungeonLevel: number = 0; // Current Dungeon Level Index
  enemyInfo:any = {};       // Only for presets
  playerInfo:any = {};
  // Game outcome and points
  gameOutcome: string = 'You Lose!';

  constructor(private GameService: GameService, private SnackbarService: SnackbarService) {
    this.GameService.setupSocketConnection();
    this.GameService.listenToServer('presets').subscribe((data) => {
      this.dungeon = data[0];
      this.dungeonLevel = data[1];
      if(this.dungeonLevel == 12) {
        this.gameOutcome = 'You Win!';
      }
      this.enemyInfo = data[2];
      this.playerInfo = data[3];
      this.canUseSpecialAbility = data[4];
    });
    this.GameService.listenToServer('energyPhase').subscribe((data) => {
      if(typeof data[0] === 'boolean') {
        this.isEnergyPhase = data[0];
        if(!Array.isArray(data[1])) {
          this.playerInfo = data[1];
        }
        else {
          this.canUseSpecialAbility = data[2];
          if(this.character.name === 'Ranger') {
            this.energyDice = data[1];
            this.rangerAbilityUsed = data[3];
            this.necromancerAbilityUsed = false;
            this.paladinAbilityUsed = false;
            this.knightAbilityUsed = false;
          }
          else if (this.character.name === 'Necromancer') {
            this.energyDice = data[1];
            this.necromancerAbilityUsed = data[3];
            this.paladinAbilityUsed = false;
            this.knightAbilityUsed = false;
            this.rangerAbilityUsed = false;
          }
          else if(this.character.name === 'Paladin') {
            this.paladinAbilityUsed = data[3];
            if(this.paladinAbilityUsed) {
              this.lastTurnAssignedStats = data[1];  
            }
            else {
              this.energyDice = data[1];
            }
            this.knightAbilityUsed = false;
            this.rangerAbilityUsed = false;
            this.necromancerAbilityUsed = false;
          }
          else {
            this.energyDice = data[1];
            this.knightAbilityUsed = data[3];
            this.rangerAbilityUsed = false;
            this.necromancerAbilityUsed = false;
            this.paladinAbilityUsed = false;
          }
        }
      }
      else {
        if(typeof data[0] === 'string') {
          this.SnackbarService.openSnackBar(data[0], 'Got it!');
          this.canUseSpecialAbility = data[1];
        }
        else {
          this.energyDice = data[0];
          this.canUseSpecialAbility = data[1];
        }
      }
    });
    this.GameService.listenToServer('playerPhase').subscribe((data) => {
      if(typeof data[0] === 'string') {
        this.SnackbarService.openSnackBar(data[0], 'Got it!');
      }
      else {
        this.dungeon = data[0];
        if(!(data[1] === undefined)) {
          this.playerInfo = data[1];
        }
      }
    });
    this.GameService.listenToServer('enemyPhase').subscribe((data) => {
      this.dungeon = data[0];
      if(!(data[1] === undefined)) {
        this.playerInfo = data[1];
      }
    });
    this.GameService.listenToServer('levelUpOrRest').subscribe((data) => {
      this.levelUpOrRest = data[0];
    });
  }

  ngOnDestroy(): void {
    this.GameService.disconnect();
  }

  listenChildComponent(choiceOfUser: { name: string, description: string, chosen: boolean }) {
    this.isCharacterBeenChosen = choiceOfUser.chosen;
    this.character.name = choiceOfUser.name;
    this.character.description = choiceOfUser.description;
    this.GameService.emit('startGame', this.character.name);
  }

  countZeroes(): number {
    return this.assignedStats.filter(value => value === 0).length;
  }

  useSpecialAbility() {
    this.assignedStats = [0,0,0];
    this.GameService.emit('useSpecialAbility', true);
  }

  assignDie(die: number) {
    this.isDieButtonPressed = true;
    this.die = die;
  }

  radioChecked(radioValue: number) {
    if(radioValue === 3) {
      if(this.rangeModifier != 0) {
        this.energyDice.push(this.rangeModifier);
      }
      this.rangeModifier = this.die;
    }
    else {
      if(this.assignedStats[radioValue] != 0) {
        this.energyDice.push(this.assignedStats[radioValue]);
      }
      this.assignedStats[radioValue] = this.die;
    }
    let index = this.energyDice.indexOf(this.die);
    if (index > -1) {                               // check if selected die is present in energyDice array
      this.energyDice.splice(index, 1);             // remove the selected die from energyDice array
    }
    this.die = 0;
  }

  knightAbility(radioValue: number) {
    if(this.assignedStats[radioValue] != 0) {
      this.assignedStats[radioValue] += this.die;
      if(this.energyDice.length > 0) {
        switch(radioValue) {
          case 0:
            this.stat = 'mov';
            break;
          case 1:
            this.stat = 'dmg';
            break;
          case 2:
            this.stat = 'def';
            break;
          default: console.log('radioValue not valid on knightAbility function!');
        }
      }
    }
    else {
      this.assignedStats[radioValue] = this.die;
    }
    let index = this.energyDice.indexOf(this.die);
    if (index > -1) {
      this.energyDice.splice(index, 1);
    }
    this.die = 0;
  }

  placePreviousStatDie(radioValue: string) {
    this.stat = radioValue;
  }

  chosenStat(radioValue: number) {
    this.statToLevelUp = radioValue;
  }

  confirmStat() {
    this.stat = '';
    if(this.necromancerAbilityUsed) {
      this.GameService.emit('assignedStats', this.coordinates);
      this.coordinates = [];
      this.necromancerAbilityUsed = false;
    }
    else if(this.knightAbilityUsed) {
      this.GameService.emit('assignedStats', this.assignedStats);
      this.knightAbilityUsed = false;
    }
    else {
      this.GameService.emit('assignedStats', this.assignedStats, this.rangeModifier);
    }
  }

  confirmPreviousStat() {
    switch(this.stat) {
      case 'mov':
        this.assignedStats[0] = this.lastTurnAssignedStats[0];
        this.energyDice.shift();
        break;
      case 'dmg':
        this.assignedStats[1] = this.lastTurnAssignedStats[1];
        this.energyDice.splice(1, 1);
        break;
      case 'def':
        this.assignedStats[2] = this.lastTurnAssignedStats[2];
        this.energyDice.pop();
        break;
      default: console.log('Chosen stat not valid in confirmPreviousStat function!');
    }
    this.lastTurnAssignedStats = [0,0,0];
    this.paladinAbilityUsed = false;
  }

  // Player Phase functions
  
  setCoordinates(coordinates: [number, number]) {
    if(!this.isEnergyPhase || this.necromancerAbilityUsed) {
      this.coordinates = coordinates;
    }
  }

  move() {
    if(this.playerAction == 'move') {
      this.playerAction = '';
    }
    else {
      this.playerAction = 'move';
    }
  }

  attack() {
    if(this.playerAction == 'attack') {
      this.playerAction = '';
    }
    else {
      this.playerAction = 'attack';
    }
  }

  confirmAction() {
    this.GameService.emit('playerPhase', false, this.playerAction, this.coordinates);
    this.coordinates = [];
  }

  endTurn() {
    this.GameService.emit('playerPhase', true);
    this.playerAction = '';
    for(let i = 0; i < 3; i++) {
      this.assignedStats[i] = 0;
    }
    this.rangeModifier = 0;
  }

  // Level Up Or Rest Phase

  levelUpButton() {
    if(this.levelUp) {
      this.levelUp = false;
      this.statToLevelUp = 4;
    }
    else {
      this.levelUp = true;
    }
  }

  restButton() {
    if(this.rest) {
      this.rest = false;
    }
    else {
      this.rest = true;
    }
  }

  confirmChoiceOnEndLevel() {
    if(this.levelUp) {
      this.GameService.emit('levelUpOrRest', true, this.statToLevelUp);
    }
    else {
      this.GameService.emit('levelUpOrRest', false);
    }
    this.statToLevelUp = 4;
    this.levelUp = false;
    this.rest = false;
    this.levelUpOrRest = false;
  }

  giveUp() {
    this.playerInfo.hp = 0;
  }
}
