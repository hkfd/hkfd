export namespace Api {
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

  export namespace Blocks {
    export interface TextBlock extends Block {
      type: 'text';
      data: Text[];
    }

    export interface ImageBlock extends Block {
      type: 'image';
      data: {
        image: Image;
      };
      fullBleed?: boolean;
    }

    export interface DuoBlock extends Block {
      type: 'duo';
      data: {
        image: Image;
      }[];
    }

    export interface GalleryBlock extends Block {
      type: 'gallery';
      data: {
        image: Image;
      }[];
    }

    export interface VideoBlock extends Block {
      type: 'video';
      data: {
        video: Video;
      };
    }

    export interface AudioBlock extends Block {
      type: 'audio';
      data: {
        audio: Audio;
      };
    }

    interface Block {
      type: 'text' | 'image' | 'gallery' | 'video' | 'audio' | 'duo';
    }
  }

  export interface Client {
    sector: string;
    list: string[];
  }

  export interface Career {
    id: string;
    title: string;
    salary: string;
    content: Content[];
  }

  export interface Team {
    name: string;
    position: string;
    thumbnail: {
      image: Image;
    };
  }

  interface Content {
    title?: string;
    data: (
      | Blocks.TextBlock
      | Blocks.ImageBlock
      | Blocks.GalleryBlock
      | Blocks.VideoBlock
      | Blocks.AudioBlock
      | Blocks.DuoBlock)[];
  }

  export interface CaseStudy extends Post {
    sector?: string;
    featured: boolean;
    colour: string;
    overview: string[];
  }

  export interface Service extends Post {
    description: string;
  }

  export interface Post {
    id: string;
    title: string;
    intro: Blocks.TextBlock;
    thumbnail: {
      image: Image;
    };
    content: Content[];
  }
}
