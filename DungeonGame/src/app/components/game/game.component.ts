import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CharacterComponent } from "./character/character.component";
import { ReplaceNumberWithDiceDirective } from '../../directives/replace-number-with-dice.directive';
import { RenderGameMapDirective } from '../../directives/render-game-map.directive';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NgFor, RouterModule, NgIf, CharacterComponent, ReplaceNumberWithDiceDirective, RenderGameMapDirective]
})

export class GameComponent {

  dungeonLevel: number = 0;
  isCharacterBeenChosen: boolean = false;
  character: { name: string, description: string } = { name: '', description: ''} ;

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

  testDirective() {
    console.log("button clicked use special");
    if(this.dungeonLevel === 1) {
      this.dungeonLevel = 0;
    }
    else {
      this.dungeonLevel = 1;
    }
  }
}