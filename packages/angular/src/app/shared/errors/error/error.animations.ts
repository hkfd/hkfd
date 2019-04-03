import {
  trigger,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

export const ErrorAnimations = [
  trigger('error', [
    transition(':enter', [
      style({ height: 0, transform: 'translateY(-100%)' }),
      group([
        animate(
          '0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
          style({ height: '*' })
        ),
        animate(
          '0.4s 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
          style({ transform: '*' })
        )
      ])
    ])
  ])
];
