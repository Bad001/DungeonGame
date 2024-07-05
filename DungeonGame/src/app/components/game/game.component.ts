import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CharacterComponent } from "./character/character.component";
import { ReplaceNumberWithDiceDirective } from '../../directives/replace-number-with-dice.directive';
import { RenderGameMapDirective } from '../../directives/render-game-map.directive';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NgFor, RouterModule, NgIf, CharacterComponent, ReplaceNumberWithDiceDirective, RenderGameMapDirective, FormsModule]
})

export class GameComponent {
 
  dungeonLevel: number = 0;
  isCharacterBeenChosen: boolean = false;
  isEnergyPhase: boolean = true;
  isDieButtonPressed: boolean = false;
  character: { name: string, description: string } = { name: '', description: ''};
  energyDice = [4,6,1];
  assignedStats = [0,0,0];
  die: number = 0;
  stat: string = '';

  characters: { name: string, description: string }[] = [
    { "name": 'Barbarian', "description": 'Once per turn, you may choose to reroll all dice when on 1 Health' },
    { "name": 'Cleric', "description": 'If you roll the same number with all Energy dice, you can increase it by 2 (max.6)' },
    { "name": 'Knight', "description": 'Once per Dungeon Level you may assign 2 Energy dice of the same value' },
    { "name": 'Necromancer', "description": 'Once per Dungeon Level you may choose to lose 1 HP to inflict 1 Damage' },
    { "name": 'Paladin', "description": 'Once per Dungeon Level you may leave one Energy Dice in place from last turn' },
    { "name": 'Ranger', "description": 'Once per Dungeon Level you may assign a die to Range instead of Speed' },
    { "name": 'Rogue', "description": 'Once per Dungeon Level you may increase the value of all Energy dice rolled by 1' },
    { "name": 'Wizard', "description": 'Once per Dungeon Level you may reroll all Energy dice' },
  ];

  dungeon:any [][] = [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0],        // Test
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0],        
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0]
    ]
  ]

  listenChildComponent(choiceOfUser: { name: string, description: string, chosen: boolean }) {
    this.isCharacterBeenChosen = choiceOfUser.chosen;
    this.character.name = choiceOfUser.name;
    this.character.description = choiceOfUser.description;
  }

  assignDie(die: number) {
    this.isDieButtonPressed = true;
    this.die = die;
  }

  radioChecked(radioValue: string) {
    this.stat = radioValue;
    switch(radioValue) {
      case 'mov':
        if(this.assignedStats[0] != 0) {
          this.energyDice.push(this.assignedStats[0]);
        }
        this.assignedStats[0] = this.die;
        break;
      case 'dmg':
        if(this.assignedStats[1] != 0) {
          this.energyDice.push(this.assignedStats[1]);
        }
        this.assignedStats[1] = this.die;
        break;
      case 'def':
        if(this.assignedStats[2] != 0) {
          this.energyDice.push(this.assignedStats[2]);
        }
        this.assignedStats[2] = this.die;
        break;
      default: console.log(radioValue + " is not valid!");
    }
    let index = this.energyDice.indexOf(this.die);
    if (index > -1) {
      this.energyDice.splice(index, 1);
    }
    this.die = 0;
  }

  confirmStat() {
    console.log(this.assignedStats);
  }
}