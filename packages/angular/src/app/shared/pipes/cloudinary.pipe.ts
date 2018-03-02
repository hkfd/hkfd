import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

interface args {
  width?: string | number;
  height?: string | number;
  crop?: string;
}

@Pipe({
  name: 'cloudinary'
})
export class CloudinaryPipe implements PipeTransform {
  private url = `https://res.cloudinary.com/${
    environment.cloudinaryName
  }/image/upload`;

  transform(
    imageName: string,
    { width = 'iw', height = 'ih', crop = 'limit' }: args = {}
  ): string {
    if (!imageName) return;

    const args: args = {
      width: `w_${width}`,
      height: `h_${height}`,
      crop: `c_${crop}`
    };

    return `${this.url}/${args.width},${args.height},${args.crop}/${imageName}`;
  }
}
