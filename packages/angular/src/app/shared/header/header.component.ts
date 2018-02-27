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
    { url: '/' },
    { title: 'ABOUT', url: '/about' },
    { title: 'OUR WORK', url: '/work' },
    { title: 'CAREERS', url: '/careers' },
    { title: 'CONTACT', url: '/contact' }
  ];

  mobileShow: boolean = false;

  constructor(private router: Router) {}

  linkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  navClick(url: string) {
    this.mobileShow = false;
    this.router.navigateByUrl(url);
  }

  toggleMobile() {
    this.mobileShow = !this.mobileShow;
  }
}
