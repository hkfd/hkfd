import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  links = [
    {
      url: 'https://www.facebook.com/HeckfordAdvertising/',
      icon: '/assets/icons/facebook.svg',
      alt: 'Facebook'
    },
    {
      url: 'https://twitter.com/HkfdAdvertising',
      icon: '/assets/icons/twitter.svg',
      alt: 'Twitter'
    },
    {
      url: 'https://www.instagram.com/heckfordadvertising/',
      icon: '/assets/icons/instagram.svg',
      alt: 'Instagram'
    },
    {
      url: 'https://www.pinterest.com/heckford/',
      icon: '/assets/icons/pinterest.svg',
      alt: 'Pinterest'
    },
    {
      url: 'https://www.youtube.com/user/heckfordadvertising',
      icon: '/assets/icons/youtube.svg',
      alt: 'YouTube'
    },
    {
      url: 'https://plus.google.com/+Heckford-advertisingCoUk',
      icon: '/assets/icons/google-plus.svg',
      alt: 'Google+'
    },
    {
      url: 'https://www.linkedin.com/company/heckford',
      icon: '/assets/icons/linkedin.svg',
      alt: 'LinkedIn'
    }
  ];
}
