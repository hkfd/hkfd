import { Image } from './shared.module';

export interface TextAttributes {
  bold?: boolean;
  italic?: boolean;
}

export interface Sentence {
  text: string;
  url?: string;
  attributes?: TextAttributes;
}

export interface Paragraph {
  paragraph: Sentence[];
}

export interface TextBlock extends Data {
  data: Paragraph[];
}

export interface ImageBlock extends Data {
  image: Image;
}

export interface GalleryBlock extends Data {
  images: Image[];
}

export interface Data {
  type: 'text' | 'image' | 'gallery';
}

export interface Content {
  title?: string;
  data: Data[];
}
