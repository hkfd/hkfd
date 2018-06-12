import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const FormAnimations = [
  trigger('formState', [
    state('1', style({ height: 0 })),

    transition('* => 1', animate('0.6s cubic-bezier(0.075, 0.82, 0.165, 1)'))
  ])
];
