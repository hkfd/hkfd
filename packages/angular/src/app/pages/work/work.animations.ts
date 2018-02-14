import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const WorkAnimations = [
  trigger('caseStudyList', [
    transition('* => 1', [
      style({
        transform: 'scale(0.9) translateY(40%)'
      }),
      animate(
        '400ms ease',
        style({
          transform: 'scale(1) translateY(0)'
        })
      )
    ])
  ])
];
