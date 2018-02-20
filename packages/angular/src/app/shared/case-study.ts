import { Image, Content, TextBlock } from './shared.module';

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  featured: boolean;
  colour: string;
  thumbnail: Image;
  overview: string[];
  intro: TextBlock;
  content: Content[];
}
