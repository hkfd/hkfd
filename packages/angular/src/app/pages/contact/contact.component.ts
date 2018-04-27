import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/shared.module';
import { ContactImages } from './contact.images';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  images = ContactImages;

  constructor(private titleService: TitleService) {}

  messageClick() {
    ga('send', 'event', 'Message Us Button', 'click');
  }

  ngOnInit() {
    this.titleService.setTitle('Contact');
  }
}
