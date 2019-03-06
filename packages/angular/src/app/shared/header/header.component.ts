import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HeaderAnimations } from './header.animations';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: HeaderAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  pages = [
    { url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Our Work', url: '/work' },
    { title: 'Careers', url: '/careers' },
    { title: 'Contact', url: '/contact' },
    { title: 'News', url: '/news' }
  ];

  mobileShow = false;

  navClick() {
    this.mobileShow = false;
  }

  toggleMobile() {
    this.mobileShow = !this.mobileShow;
  }
}
