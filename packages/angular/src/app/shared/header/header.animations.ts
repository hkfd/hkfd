import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const HeaderAnimations = [
  trigger('linkState', [
    transition(
      '* => *',
      query('a', [
        style({ transform: 'translateY(250%)' }),
        stagger(50, [animate('0.4s ease', style({ transform: 'none' }))])
      ])
    )
  ])
];
