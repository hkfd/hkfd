import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const NewsAnimations = [
  trigger('listAnimation', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({ transform: 'translateY(20%)' }),
          stagger(50, [
            animate(
              '0.4s cubic-bezier(0.075, 0.82, 0.165, 1)',
              style({ transform: 'translateY(0)' })
            )
          ])
        ],
        { optional: true }
      )
    ])
  ])
];
