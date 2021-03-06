export interface TextData {
  start: number;
  end: number;
  type: string;
  data?: {
    link_type: string;
    url: string;
  };
}

export interface Text {
  spans: TextData[];
  text: string;
  type: string;
}

interface ImageDataDimensions {
  width: number;
  height: number;
}

interface ImageData {
  alt?: string;
  copyright?: string;
  dimensions: ImageDataDimensions;
  url: string;
}

export interface Image {
  alt?: string;
  copyright?: string;
  dimensions: ImageDataDimensions;
  url: string;
  lg: ImageData;
  md: ImageData;
  sm: ImageData;
  xs: ImageData;
  proxy: ImageData;
}

export interface Video {
  link_type: string;
  url: string;
}

export interface Block {
  slice_type: 'text' | 'image' | 'duo' | 'gallery' | 'video';
  slice_label?: string;
  primary?: any;
  items?: any;
}

export interface TextBlock extends Block {
  slice_type: 'text';
  primary: {
    text: Text[];
  };
}

export interface ImageBlockData {
  image: Image;
}

export interface ImageBlock extends Block {
  slice_type: 'image';
  primary: ImageBlockData;
}

export interface DuoBlockData extends Array<ImageBlockData> {}

export interface DuoBlock extends Block {
  slice_type: 'duo';
  items: DuoBlockData;
}

export interface GalleryBlockData extends Array<ImageBlockData> {}

export interface GalleryBlock extends Block {
  slice_type: 'gallery';
  items: GalleryBlockData;
}

export interface VideoBlockData {
  video: Video;
}

export interface VideoBlock extends Block {
  slice_type: 'video';
  primary: VideoBlockData;
}

export interface News {
  title: Text[];
  description: string;
  image: Image;
  body: Block[];
}

export interface Career {
  title: Text[];
  salary: string;
  contact: string;
  body: TextBlock[];
}

interface Post {
  alternate_languages: string[];
  data: News | Career;
  first_publication_date: Date | null;
  href: string;
  id: string;
  lang?: string;
  last_publication_date: Date | null;
  linked_documents?: any[];
  slugs: string[];
  tags: string[];
  type: PostTypes;
  uid?: string;
}

export interface NewsPost extends Post {
  data: News;
  type: 'news';
}

export interface CareerPost extends Post {
  data: Career;
  type: 'career';
}

export interface PostsResponse<T extends NewsPost | CareerPost> {
  license: string;
  next_page: string | null;
  page: number;
  prev_page: string | null;
  results: T[];
  results_per_page: number;
  results_size: number;
  total_pages: number;
  total_results_size: number;
  version: string;
}

export interface Ref {
  id: string;
  isMasterRef: boolean;
  label: string;
  ref: string;
}

export interface RefResponse {
  bookmarks: {};
  experiments: {};
  forms: {};
  license: string;
  oauth_initiate: string;
  oauth_token: string;
  refs: Ref[];
  tags: any[];
  types: {};
  version: string;
}

export type PostTypes = 'news' | 'career';
