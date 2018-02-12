export interface Image {
  name: string;
  alt?: string;
}

export interface Slider extends Image {
  active?: boolean;
  prev?: number;
  next?: number;
}
