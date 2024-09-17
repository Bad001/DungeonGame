import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [RouterOutlet, NgFor, RouterModule, NgIf, CharacterComponent, ReplaceNumberWithDiceDirective, RenderGameMapDirective, FormsModule]
})

export class GameComponent implements OnDestroy {

  dungeonLevel: number = 0;
  isCharacterBeenChosen: boolean = false;
  isEnergyPhase: boolean = true;
  isDieButtonPressed: boolean = false;
  character: { name: string, description: string } = { name: '', description: ''};
  assignedStats = [0,0,0];
  die: number = 0;
  coordinates: number[] = [];
  energyDice: any[] = [];
  characters: { name: string, description: string }[] = this.GameService.getCharacters();
  dungeon:any [] = [];
  enemyInfo:any = {};

  constructor(private GameService: GameService) {
    this.GameService.setupSocketConnection();
    this.GameService.listenToServer('energyPhase').subscribe((data) => {
      this.energyDice = data[0];
    });
    this.GameService.listenToServer('presets').subscribe((data) => {
      this.dungeon = data[0];
      console.log(data[0]);
      this.enemyInfo = data[1];
      this.dungeonLevel = data[2];
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
    this.GameService.emit('assignedStats', this.assignedStats);
    for(let i = 0; i < 3; i++) {
      this.assignedStats[i] = 0;
      this.energyDice[i] = 0;
    }
  }

  setCoordinates(coordinates: [number, number]) {
    this.coordinates = coordinates;
  }

  endTurn() {
    this.isEnergyPhase = true;
  }
}