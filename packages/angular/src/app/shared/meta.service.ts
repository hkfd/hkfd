import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from 'environment';
import { LoggerService } from './logger.service';
import { MetaTags } from 'shared';
import { createTitle } from './meta.service.helpers';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private meta: Meta,
    private title: Title,
    private logger: LoggerService
  ) {}

  setMetaTags(tags: Partial<MetaTags>) {
    this.title.setTitle(createTitle(tags));

    const metaTags: MetaTags = {
      type: 'website',
      title: 'Heckford',
      description: 'Independent advertising & marketing agency',
      image: `${environment.deployUrl}assets/heckford.png`,
      ...tags,
      url: `${environment.deployUrl}${tags.url || ''}`
    };

    this.logger.log('setMetaTags', metaTags);

    this.meta.updateTag({
      name: 'description',
      content: metaTags.description
    });

    this.meta.updateTag({ property: 'og:type', content: metaTags.type });
    this.meta.updateTag({ property: 'og:title', content: metaTags.title });
    this.meta.updateTag({
      property: 'og:description',
      content: metaTags.description
    });
    this.meta.updateTag({ property: 'og:url', content: metaTags.url });
    this.meta.updateTag({ property: 'og:image', content: metaTags.image });
  }
}
