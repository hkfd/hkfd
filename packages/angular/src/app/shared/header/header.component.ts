import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderAnimations } from './header.animations';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: HeaderAnimations
})
export class HeaderComponent {
  pages = [
    { title: 'ABOUT', url: '/about' },
    { title: 'OUR WORK', url: '/work' },
    { title: 'NEWS', url: '/news' },
    { title: 'CAREERS', url: '/careers' },
    { title: 'CONTACT', url: '/contact' }
  ];

  mobileShow: boolean = false;

  constructor(private router: Router) {}

  navClick(url: string) {
    if (!url) return;

    this.router.navigate([url]).then(_ => (this.mobileShow = false));
  }

  toggleMobile() {
    this.mobileShow = this.mobileShow === true ? false : true;
  }
}
