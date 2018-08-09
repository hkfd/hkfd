import { Pipe, PipeTransform } from '@angular/core';

import { Api } from 'api';
import { Generic } from '../generic';
import { environment } from '../../../environments/environment';

export const Sizes = [
  { width: 550, height: 300 },
  { width: 800, height: 533 },
  { width: 1200, height: 800 },
  { width: 1800, height: 1200 },
  { width: 2400, height: 1600 }
];

@Pipe({
  name: 'api'
})
export class ApiPipe implements PipeTransform {
  private transformImage({ image }: { image: Api.Image }): Generic.Image {
    return {
      src: `https://res.cloudinary.com/${
        environment.cloudinaryName
      }/image/upload/w_64,h_ih,c_limit,q_auto,f_auto/${image.name}`,
      srcset: {
        attr: 'srcset',
        val: Sizes.map(
          size =>
            `https://res.cloudinary.com/${
              environment.cloudinaryName
            }/image/upload/w_${size.width},h_${size.height},c_limit/${
              image.name
            } ${size.width - 400}w`
        )
      },
      alt: image.alt
    };
  }

  private transformVideo({ video }: { video: Api.Video }): Generic.Video {
    return {
      src: {
        attr: 'src',
        val: [
          `https://www.youtube.com/embed/${video.id}?&origin=https://hkfd.co.uk`
        ]
      }
    };
  }

  private transformAudio({ audio }: { audio: Api.Audio }): Generic.Audio {
    return {
      url: audio.url
    };
  }

  transform(val: any | any[]): any {
    if (val.image) return this.transformImage(val);
    if (val.video) return this.transformVideo(val);
    if (val.audio) return this.transformAudio(val);

    return val.map(image => this.transformImage(image));
  }
}
