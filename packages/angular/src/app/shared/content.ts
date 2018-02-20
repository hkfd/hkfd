import { Image } from './shared.module';

export interface TextAttributes {
  bold?: boolean;
  italic?: boolean;
  heading?: boolean;
}

export interface Sentence {
  text: string;
  url?: string;
  attributes?: TextAttributes;
}

export interface TextData {
  paragraph?: Sentence[];
  list?: Sentence[];
}

export interface TextBlock extends Data {
  data: TextData[];
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

export interface AudioBlock extends Data {
  url: string;
}

export interface Data {
  type: 'text' | 'image' | 'gallery' | 'video' | 'audio';
}

export interface Content {
  title?: string;
  data: Data[];
}
