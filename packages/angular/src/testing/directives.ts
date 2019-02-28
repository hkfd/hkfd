import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[lazy]'
})
export class StubLazyDirective {
  @Output()
  isVisible = new EventEmitter<true>();
}
