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
  
  @Input() appReplaceNumberWithDice:any = '';

  constructor(private element: ElementRef) {}
  ngAfterViewInit() {
    if(this.element.nativeElement.innerHTML > 6 && this.element.nativeElement.innerHTML < 13) {
      this.element.nativeElement.innerHTML = "<div style=\"clip-path: polygon( 50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%);background-color: red;\">" + this.element.nativeElement.innerHTML + "</div>"
    }
    else {
      if(typeof this.appReplaceNumberWithDice === 'object' && this.appReplaceNumberWithDice !== null) {
        this.element.nativeElement.innerHTML = this.appReplaceNumberWithDice['hp'];
        if(this.appReplaceNumberWithDice['name'] != 'Player') {
          this.element.nativeElement.style.color = 'darkred';
        }
        else {
          this.element.nativeElement.style.color = 'darkgreen';
        }
      }
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
        default: if(this.element.nativeElement.innerHTML != '') console.log("ReplaceNumberWithDiceDirective: The number of the element is not a die face!");
      }
    }
  }
}
