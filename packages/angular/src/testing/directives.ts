import { Directive, Input } from '@angular/core';

import { Generic } from 'shared';

@Directive({
  selector: '[lazy]'
})
export class StubLazyDirective {
  @Input('lazy')
  data!: Generic.Lazy;
}
