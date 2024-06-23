import { Directive, ElementRef } from '@angular/core';

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
  constructor(private element: ElementRef) {}
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
      default: console.log("ReplaceNumberWithDiceDirective: The number of the element is not valid!");
    }
  }
}
