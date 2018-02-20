import { Image, Content, TextBlock } from './shared.module';

export interface Service {
  id: string;
  title: string;
  description: string;
  intro: TextBlock;
  thumbnail: Image;
  content: Content[];
  overview: string; // Property not used, for AOT only
}
