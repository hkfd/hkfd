export interface Image {
  name: string;
  alt: string;
  loaded?: boolean;
}

export interface Slider extends Image {
  active?: boolean;
  prev?: number;
  next?: number;
}
