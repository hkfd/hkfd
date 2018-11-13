import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'environment';
import { Api, Generic } from 'shared';

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
  private transformImage({
    image: { name, alt }
  }: {
    image: Api.Image;
  }): Generic.Image {
    return {
      src: `https://res.cloudinary.com/${
        environment.cloudinaryName
      }/image/upload/w_64,h_ih,c_limit,q_auto,f_auto/${name}`,
      srcset: {
        attr: 'srcset',
        val: Sizes.map(
          ({ width, height }) =>
            `https://res.cloudinary.com/${
              environment.cloudinaryName
            }/image/upload/w_${width},h_${height},c_limit,q_auto,f_auto/${name} ${width -
              400}w`
        )
      },
      alt
    };
  }

  private transformVideo({
    video: { id }
  }: {
    video: Api.Video;
  }): Generic.Video {
    return {
      src: {
        attr: 'src',
        val: [`https://www.youtube.com/embed/${id}?&origin=https://hkfd.co.uk`]
      }
    };
  }

  private transformAudio({
    audio: { url }
  }: {
    audio: Api.Audio;
  }): Generic.Audio {
    return {
      url
    };
  }

  transform(val: any): any {
    if (val.image) return this.transformImage(val);
    if (val.video) return this.transformVideo(val);
    if (val.audio) return this.transformAudio(val);
    if (Array.isArray(val)) return val.map(image => this.transformImage(image));

    return val;
  }
}
