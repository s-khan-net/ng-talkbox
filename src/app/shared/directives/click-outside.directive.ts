import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:click', ['$event.target'])
  public onClick(target: any) {
    console.log('d', target)
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}