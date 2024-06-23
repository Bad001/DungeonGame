import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRenderGameMap]',
  standalone: true
})
export class RenderGameMapDirective {
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    if(this.element.nativeElement.innerHTML == '0') {
      this.element.nativeElement.style.backgroundColor = 'DarkGoldenRod'
      this.element.nativeElement.innerHTML = '';
    }
    else {
      this.element.nativeElement.style.backgroundColor = 'DimGrey'
      this.element.nativeElement.innerHTML = '';
    }
  }
}
