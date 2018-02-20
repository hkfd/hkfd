import { Image } from './images';
import { Content } from './shared.module';

export interface Service {
  id: string;
  title: string;
  description: string;
  intro: string;
  thumbnail: Image;
  content: Content[];
  overview: string; // Property not used, for AOT only
}
