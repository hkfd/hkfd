import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';

export const AppAnimations = [
  trigger('routeTransition', [
    transition('work <=> post', [
      group([
        query(
          ':enter, :leave',
          style({ position: 'absolute', left: 0, right: 0 }),
          {
            optional: true
          }
        ),
        query(':leave', style({ height: '*', opacity: 1 }), {
          optional: true
        }),
        query(':enter', style({ height: 0, opacity: 0 }), { optional: true })
      ]),
      query(
        ':leave',
        animate('0.3s ease-out', style({ height: 0, opacity: 0 })),
        { optional: true }
      ),
      query(
        ':enter',
        animate('0.4s ease-in', style({ height: '*', opacity: 1 })),
        { optional: true }
      )
    ]),
    transition('* => *', [
      group([
        query(
          ':enter, :leave',
          style({ position: 'absolute', left: 0, right: 0 }),
          {
            optional: true
          }
        ),

        query(
          ':enter',
          [style({ opacity: 0 }), animate('0.4s ease', style({ opacity: 1 }))],
          { optional: true }
        ),

        query(
          ':leave',
          [style({ opacity: 1 }), animate('0.4s ease', style({ opacity: 0 }))],
          { optional: true }
        )
      ])
    ])
  ])
];
