import { Pipe, PipeTransform } from '@angular/core';

import { Prismic } from '../prismic';
import { Generic } from '../generic';

@Pipe({
  name: 'prismic'
})
export class PrismicPipe implements PipeTransform {
  private transformImage({ image }: { image: Prismic.Image }): Generic.Image {
    return {
      src: image.proxy.url,
      srcset: {
        attr: 'srcset',
        val: [
          `${image.xs.url} ${image.xs.dimensions.width - 400}w`,
          `${image.sm.url} ${image.sm.dimensions.width - 400}w`,
          `${image.md.url} ${image.md.dimensions.width - 400}w`,
          `${image.lg.url} ${image.lg.dimensions.width - 400}w`,
          `${image.url} ${image.dimensions.width - 400}w`
        ]
      },
      alt: image.alt
    };
  }

  private transformVideo({ video }: { video: Prismic.Video }): Generic.Video {
    return {
      src: {
        attr: 'src',
        val: [video.url]
      }
    };
  }

  transform(val: any | any[]): any {
    if (val.image) return this.transformImage(val);
    if (val.video) return this.transformVideo(val);

    return val.map(image => this.transformImage(image));
  }
}
