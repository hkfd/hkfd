import { Image } from './images';

export interface Service {
  id: string;
  title: string;
  intro: string;
  thumbnail: Image;
}
