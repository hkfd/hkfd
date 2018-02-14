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
    transition('* => *', [
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger(200, [animate('0.5s', style({ opacity: 1 }))])
        ],
        { optional: true }
      )
    ])
  ])
];
