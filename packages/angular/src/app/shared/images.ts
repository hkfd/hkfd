export interface Image {
  name: string;
  alt: string;
  loaded?: boolean;
}

export interface Lazy {
  attr: string;
  value: string[];
}
