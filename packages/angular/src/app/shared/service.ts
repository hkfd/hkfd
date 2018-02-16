import { Image } from './images';
import { Content } from './shared.module';

export interface Service {
  id: string;
  title: string;
  intro: string;
  thumbnail: Image;
  content: Content[];
}
