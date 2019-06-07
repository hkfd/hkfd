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

export interface Text {
  paragraph?: Sentence[];
  list?: Sentence[];
}

export interface Image {
  name: string;
  alt: string;
}

export interface Video {
  id: string;
}

export interface Audio {
  url: string;
}

export interface TextBlock extends Block {
  type: 'text';
  data: Text[];
}

export interface ImageBlockData {
  image: Image;
}

export interface ImageBlock extends Block {
  type: 'image';
  data: ImageBlockData;
  fullBleed?: boolean;
}

export interface DuoBlockData extends Array<ImageBlockData> {}

export interface DuoBlock extends Block {
  type: 'duo';
  data: DuoBlockData;
}

export interface GalleryBlockData extends Array<ImageBlockData> {}

export interface GalleryBlock extends Block {
  type: 'gallery';
  data: GalleryBlockData;
}

export interface VideoBlockData {
  video: Video;
}

export interface VideoBlock extends Block {
  type: 'video';
  data: VideoBlockData;
}

export interface AudioBlockData {
  audio: Audio;
}

export interface AudioBlock extends Block {
  type: 'audio';
  data: AudioBlockData;
}

interface Block {
  type: 'text' | 'image' | 'gallery' | 'video' | 'audio' | 'duo';
}

export interface Client {
  sector: string;
  list: string[];
}

export interface Team {
  name: string;
  position: string;
  thumbnail: ImageBlockData;
}

interface Content {
  title?: string;
  data: (
    | TextBlock
    | ImageBlock
    | GalleryBlock
    | VideoBlock
    | AudioBlock
    | DuoBlock)[];
}

export interface CaseStudy extends Post {
  sector?: string;
  featured: boolean;
  colour: string;
  overview: string[];
  thumbnail: ImageBlockData;
}

export interface Service extends Post {
  description: string;
}

interface Post {
  id: string;
  title: string;
  intro: string[];
  thumbnail: ImageBlockData;
  content: Content[];
}
