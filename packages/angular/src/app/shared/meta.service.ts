import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { MetaTags } from 'shared';
import { createTitle, createMetaTags } from './meta.service.helpers';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta, private title: Title) {}

  setMetaTags(tags: Partial<MetaTags> | undefined) {
    if (!tags) return;

    this.title.setTitle(createTitle(tags));

    const { type, title, description, image, url } = createMetaTags(tags);

    this.meta.updateTag({
      name: 'description',
      content: description
    });

    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({
      property: 'og:description',
      content: description
    });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
  }
}
