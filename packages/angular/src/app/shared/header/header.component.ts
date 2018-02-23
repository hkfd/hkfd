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
    { title: 'CAREERS', url: '/careers' },
    { title: 'CONTACT', url: '/contact' }
  ];

  mobileShow: boolean = false;

  constructor(private router: Router) {}

  navClick() {
    this.mobileShow = false;
  }

  toggleMobile() {
    this.mobileShow = this.mobileShow === true ? false : true;
  }
}
