import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  links = [
    {
      url: 'https://www.facebook.com/HeckfordAdvertising/',
      icon: '/assets/icons/facebook.svg'
    },
    {
      url: 'https://twitter.com/HkfdAdvertising',
      icon: '/assets/icons/twitter.svg'
    },
    {
      url: 'https://www.instagram.com/heckfordadvertising/',
      icon: '/assets/icons/instagram.svg'
    },
    {
      url: 'https://www.pinterest.com/heckford/',
      icon: '/assets/icons/pinterest.svg'
    },
    {
      url: 'https://www.youtube.com/user/heckfordadvertising',
      icon: '/assets/icons/youtube.svg'
    },
    {
      url: 'https://plus.google.com/+Heckford-advertisingCoUk',
      icon: '/assets/icons/google-plus.svg'
    },
    {
      url: 'https://www.linkedin.com/company/heckford',
      icon: '/assets/icons/linkedin.svg'
    }
  ];
}
