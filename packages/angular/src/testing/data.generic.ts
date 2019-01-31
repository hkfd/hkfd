import { Image, Video, Audio, Lazy } from 'generic';

export namespace Generic {
  export const isImage = (data: any): data is Image => {
    return (
      data.hasOwnProperty('src') &&
      data.hasOwnProperty('srcset') &&
      data.srcset.hasOwnProperty('attr') &&
      data.srcset.hasOwnProperty('val') &&
      data.hasOwnProperty('alt')
    );
  };

  export const isVideo = (data: any): data is Video => {
    return (
      data.hasOwnProperty('src') &&
      data.src.hasOwnProperty('attr') &&
      data.src.hasOwnProperty('val')
    );
  };

  export const isAudio = (data: any): data is Audio => {
    return data.hasOwnProperty('url');
  };

  export const getImage = () => {
    const image: Image = {
      src: 'http://testing/example.jpg',
      srcset: {
        attr: 'srcset',
        val: ['']
      },
      alt: 'Example image'
    };

    return image;
  };

  export const getDuo = () => {
    const duo: Image[] = [
      {
        src: '',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      },
      {
        src: '',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      }
    ];

    return duo;
  };

  export const getImages = () => {
    const images: Image[] = [
      {
        src: 'image-1',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      },
      {
        src: 'image-2',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      },
      {
        src: 'image-3',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      },
      {
        src: 'image-4',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      },
      {
        src: 'image-5',
        srcset: {
          attr: 'srcset',
          val: ['']
        },
        alt: ''
      }
    ];

    return images;
  };

  export const getVideo = () => {
    const video: Video = {
      src: {
        attr: 'src',
        val: ['']
      }
    };

    return video;
  };

  export const getAudio = () => {
    const audio: Audio = {
      url: 'http://example.com/'
    };

    return audio;
  };

  export const getLazy = () => {
    const lazy: Lazy = {
      attr: 'srcset',
      val: ['example-xs.jpg 100w', 'example-sm.jpg 200w']
    };

    return lazy;
  };
}
