import { Component, OnInit } from '@angular/core';

import { MetaService } from 'shared';
import { ContactImages } from './contact.images';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  images = ContactImages;

  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'Contact', url: 'contact' });
  }
}
