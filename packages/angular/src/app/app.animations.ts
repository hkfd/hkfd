import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
  animateChild
} from '@angular/animations';

export const AppAnimations = [
  trigger('routeTransition', [
    transition('* => *', [
      group([
        query(':enter, :leave', style({ position: 'absolute' }), {
          optional: true
        }),

        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),
            animate('0.3s ease', style({ transform: 'translateX(0)' })),
            animateChild()
          ],
          { optional: true }
        ),

        query(
          ':leave',
          [
            style({ transform: 'translateX(0)' }),
            animate('0.3s ease', style({ transform: 'translateX(-100%)' })),
            animateChild()
          ],
          { optional: true }
        )
      ])
    ])
  ])
];
