import { Directive, Input } from '@angular/core';

import { Lazy } from 'generic';

@Directive({
  selector: '[lazy]'
})
export class StubLazyDirective {
  @Input('lazy')
  data!: Lazy;
}
