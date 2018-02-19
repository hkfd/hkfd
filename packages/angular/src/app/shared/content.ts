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
  fullBleed?: boolean;
}

export interface GalleryBlock extends Data {
  images: Image[];
}

export interface VideoBlock extends Data {
  id: string;
}

export interface Data {
  type: 'text' | 'image' | 'gallery' | 'video';
}

export interface Content {
  title?: string;
  data: Data[];
}
