import { environment } from 'environment';
import {
  Image as GenericImage,
  Video as GenericVideo,
  Audio as GenericAudio
} from 'generic';
import {
  Image as ApiImage,
  Video as ApiVideo,
  Audio as ApiAudio,
  DuoBlockData,
  GalleryBlockData
} from 'api';

export const Sizes = [
  { width: 550, height: 300 },
  { width: 800, height: 533 },
  { width: 1200, height: 800 },
  { width: 1800, height: 1200 },
  { width: 2400, height: 1600 }
];

export const transformImage = ({ name, alt }: ApiImage): GenericImage => ({
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
});

export const transformVideo = ({ id }: ApiVideo): GenericVideo => ({
  src: {
    attr: 'src',
    val: [`https://www.youtube.com/embed/${id}?&origin=https://hkfd.co.uk`]
  }
});

export const transformAudio = ({ url }: ApiAudio): GenericAudio => ({
  url
});

export const transformArray = (
  val: DuoBlockData | GalleryBlockData
): GenericImage[] => val.map(({ image }) => transformImage(image));
