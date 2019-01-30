export interface Lazy {
  attr: string;
  val: string[];
  loaded?: boolean;
}

export interface Image {
  src: string;
  srcset: Lazy;
  alt: string;
}

export interface Video {
  src: Lazy;
}

export interface Audio {
  url: string;
}
