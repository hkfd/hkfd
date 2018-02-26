import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const WorkAnimations = [
  trigger('caseStudyList', [
    state('1', style({ transform: '*' })),
    state('*', style({ transform: 'scale(0.9) translateY(40%)' })),

    transition('* => 1', animate('400ms ease'))
  ])
];
