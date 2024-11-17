import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appRenderGameMap]',
  standalone: true
})
export class RenderGameMapDirective {

  @Input() appRenderGameMap:any = '';
  constructor(private element: ElementRef) {}

  ngAfterContentInit() {
    if(this.element.nativeElement.innerHTML == '1' && typeof this.appRenderGameMap !== 'object' ) {
      this.element.nativeElement.style.backgroundColor = 'DimGrey';
      this.element.nativeElement.innerHTML = '';
    }
    else {
      this.element.nativeElement.style.backgroundColor = 'DarkGoldenRod';
      if(this.element.nativeElement.innerHTML == '0') {
        this.element.nativeElement.innerHTML = '';
      }
    }
  }
}
