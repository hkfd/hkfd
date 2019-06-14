import { Pipe, PipeTransform } from '@angular/core';

import { RichText } from 'prismic-dom';

import { linkResolver } from './prismic-text.helpers';

@Pipe({
  name: 'prismicText'
})
export class PrismicTextPipe implements PipeTransform {
  transform(val: any, type: 'asText' | 'asHtml') {
    switch (type) {
      case 'asText':
        return RichText.asText(val);
      case 'asHtml':
        return RichText.asHtml(val, linkResolver);
      default:
        throw new Error('Unsupported `type`');
    }
  }
}
