import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  pages = [
    { title: 'ABOUT', url: '/about' },
    { title: 'SERVICES', url: '/services' },
    { title: 'OUR WORK', url: '/work' },
    { title: 'NEWS', url: '/news' },
    { title: 'CAREERS', url: '/careers' },
    { title: 'CONTACT', url: '/contact' }
  ];

  mobileShow: boolean = false;

  toggleMobile() {
    this.mobileShow = this.mobileShow === true ? false : true;
  }
}
