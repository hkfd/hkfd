import { Image, Content, TextBlock } from './shared.module';

export interface CaseStudy extends Post {
  sector: string;
  featured: boolean;
  colour: string;
  overview: string[];
}

export interface Service extends Post {
  description: string;
}

export interface Career extends Post {}

export interface Post {
  id: string;
  title: string;
  intro: TextBlock;
  thumbnail: Image;
  content: Content[];
}
