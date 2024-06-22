import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {

  @Input() character: { name: string, description: string } = { name: '', description: ''};
  @Input() isSelectionPhase: boolean = true;
  @Output() sendChoice = new EventEmitter<{ name: string, description: string, chosen: boolean }>();
  
  choiceOfUser: { name: string, description: string, chosen: boolean } = { name: '', description: '', chosen: false};

  chooseCharacter(character: { name: string, description: string }): void {
    this.choiceOfUser.name = character.name;
    this.choiceOfUser.description = character.description;
    this.choiceOfUser.chosen = true;
    this.sendChoice.emit(this.choiceOfUser);
  }
}
