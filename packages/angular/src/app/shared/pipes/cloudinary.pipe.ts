import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

const URL = `https://res.cloudinary.com/${
  environment.cloudinaryName
}/image/upload`;

interface args {
  width?: string | number;
  height?: string | number;
  crop?: string;
}

@Pipe({
  name: 'cloudinary'
})
export class CloudinaryPipe implements PipeTransform {
  transform(
    image: string,
    { width = 'iw', height = 'ih', crop = 'limit' }: args = {}
  ): string {
    const args: args = {
      width: `w_${width}`,
      height: `h_${height}`,
      crop: `c_${crop}`
    };

    return `${URL}/${args.width},${args.height},${args.crop}/${image}`;
  }
}
