import { Image } from './shared.module';

export interface TextAttributes {
  bold?: boolean;
  italic?: boolean;
  link?: boolean;
}

export interface Text {
  text: string;
  url?: string;
  attributes?: TextAttributes;
}

export interface Text extends Data {
  data: Text[];
}

export interface Image extends Data {
  image: Image;
}

export interface Gallery extends Data {
  images: Image[];
}

export interface Data {
  type: 'text' | 'image' | 'gallery';
}

export interface Content {
  title: string;
  data: Data[];
}
