import { Image } from './shared.module';

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  featured: boolean;
  colour: string;
  thumbnail: Image;
}
