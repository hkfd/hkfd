import { Component } from '@angular/core';

import { ContactImages } from './contact.images';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  images = ContactImages;
}
