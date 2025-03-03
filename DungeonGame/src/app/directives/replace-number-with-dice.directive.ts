import { Directive, ElementRef, Input } from '@angular/core';

enum Dice {
  One = "⚀",
  Two = "⚁",
  Three = "⚂",
  Four = "⚃",
  Five = "⚄",
  Six = "⚅"
};

@Directive({
  selector: '[appReplaceNumberWithDice]',
  standalone: true
})
export class ReplaceNumberWithDiceDirective {
  
  @Input() enemyOrPlayer:any = '';
  @Input() enemyHp:number = 0;

  constructor(private element: ElementRef) {}

  ngAfterContentInit() {
    if(typeof this.enemyOrPlayer === 'object') {
      this.element.nativeElement.innerHTML = this.enemyOrPlayer['hp'];
      if(this.enemyOrPlayer['name'] != 'Player') {
        this.element.nativeElement.style.color = 'darkred';
        if(this.enemyHp > 6 && this.enemyHp < 13) {
          this.element.nativeElement.innerHTML = "<div style=\"clip-path: polygon( 50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);background-color: red;color: black;\">" + this.element.nativeElement.innerHTML + "</div>"
        }
      }
      else {
        this.element.nativeElement.style.color = 'darkgreen';
      }
    }
  }

  ngAfterViewInit() {
    switch(this.element.nativeElement.innerHTML) {
      case '1': this.element.nativeElement.innerHTML = Dice.One;
        break;
      case '2': this.element.nativeElement.innerHTML = Dice.Two;
        break;
      case '3': this.element.nativeElement.innerHTML = Dice.Three;
        break;
      case '4': this.element.nativeElement.innerHTML = Dice.Four;
        break;
      case '5': this.element.nativeElement.innerHTML = Dice.Five;
        break;
      case '6': this.element.nativeElement.innerHTML = Dice.Six;
        break;
      default: if(this.element.nativeElement.innerHTML != '') console.log("ReplaceNumberWithDiceDirective: The number of the element can't be a die with six faces!");
    }
  }
}
