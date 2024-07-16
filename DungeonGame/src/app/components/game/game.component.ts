import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CharacterComponent } from "./character/character.component";
import { ReplaceNumberWithDiceDirective } from '../../directives/replace-number-with-dice.directive';
import { RenderGameMapDirective } from '../../directives/render-game-map.directive';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NgFor, RouterModule, NgIf, CharacterComponent, ReplaceNumberWithDiceDirective, RenderGameMapDirective, FormsModule]
})

export class GameComponent implements OnInit, OnDestroy {
 
  constructor(private GameService: GameService) {}

  ngOnInit(): void {
    this.GameService.setupSocketConnection();
  }

  ngOnDestroy(): void {
    this.GameService.disconnect();
  }

  dungeonLevel: number = 0;
  isCharacterBeenChosen: boolean = false;
  isEnergyPhase: boolean = true;
  isDieButtonPressed: boolean = false;
  character: { name: string, description: string } = { name: '', description: ''};
  assignedStats = [0,0,0];
  die: number = 0;
  coordinates: [number, number] = [0,0];
  energyDice: [number, number, number] = this.GameService.getEnergyDice();
  characters: { name: string, description: string }[] = this.GameService.getCharacters();
  dungeon:any [][] = this.GameService.getDungeon();

  listenChildComponent(choiceOfUser: { name: string, description: string, chosen: boolean }) {
    this.isCharacterBeenChosen = choiceOfUser.chosen;
    this.character.name = choiceOfUser.name;
    this.character.description = choiceOfUser.description;
  }

  assignDie(die: number) {
    this.isDieButtonPressed = true;
    this.die = die;
  }

  radioChecked(radioValue: number) {
    if(this.assignedStats[radioValue] != 0) {
      this.energyDice.push(this.assignedStats[radioValue]);
    }
    this.assignedStats[radioValue] = this.die;
    let index = this.energyDice.indexOf(this.die);
    if (index > -1) {                               // check if selected die is present in energyDice array
      this.energyDice.splice(index, 1);             // remove the selected die from energyDice array
    }
    this.die = 0;
  }

  confirmStat() {
    this.isEnergyPhase = false;
    console.log(this.assignedStats);
  }

  setCoordinates(coordinates: [number, number]) {
    this.coordinates = coordinates;
    console.log(coordinates);
  }
}