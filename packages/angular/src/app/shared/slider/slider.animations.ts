import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

export const SliderAnimations = [
  trigger('imageState', [
    state(
      '1',
      style({
        visibility: 'visible'
      })
    ),
    state(
      '*',
      style({
        visibility: 'hidden'
      })
    ),

    transition(
      '1 => 0',
      [
        style({ visibility: 'visible' }),
        animate(
          '0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
          style({ transform: 'translateX({{ direction }}*-100%)' })
        )
      ],
      {
        params: { direction: 1 }
      }
    ),

    transition(
      '* => 1',
      [
        style({
          visibility: 'visible',
          transform: 'translateX({{ direction }}*100%)'
        }),
        animate(
          '0.5s cubic-bezier(0.075, 0.82, 0.165, 1)',
          style({ transform: 'none' })
        )
      ],
      {
        params: { direction: 1 }
      }
    )
  ])
];
