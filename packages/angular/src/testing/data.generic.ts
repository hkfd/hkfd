import { makeImmutable } from 'testing';

import { Generic as GenericType } from 'shared';

export namespace Generic {
  export const isImage = (data: any): data is GenericType.Image => {
    return (
      data.hasOwnProperty('src') &&
      data.hasOwnProperty('srcset') &&
      data.srcset.hasOwnProperty('attr') &&
      data.srcset.hasOwnProperty('val') &&
      data.hasOwnProperty('alt')
    );
  };

  export const isVideo = (data: any): data is GenericType.Video => {
    return (
      data.hasOwnProperty('src') &&
      data.src.hasOwnProperty('attr') &&
      data.src.hasOwnProperty('val')
    );
  };

  export const isAudio = (data: any): data is GenericType.Audio => {
    return data.hasOwnProperty('url');
  };

  export const getImage = () => {
    const image: GenericType.Image = {
      src: 'http://testing/example.jpg',
      srcset: {
        attr: 'srcset',
        val: ['']
      },
      alt: 'Example image'
    };

    return makeImmutable(image);
  };

  export const getDuo = () => {
    const duo: GenericType.Image[] = [
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

    return makeImmutable(duo);
  };

  export const getImages = () => {
    const images: GenericType.Image[] = [
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

    return makeImmutable(images);
  };

  export const getVideo = () => {
    const video: GenericType.Video = {
      src: {
        attr: 'src',
        val: ['']
      }
    };

    return makeImmutable(video);
  };

  export const getAudio = () => {
    const audio: GenericType.Audio = {
      url: 'http://example.com/'
    };

    return makeImmutable(audio);
  };

  export const getLazy = () => {
    const lazy: GenericType.Lazy = {
      attr: 'srcset',
      val: ['example-xs.jpg 100w', 'example-sm.jpg 200w']
    };

    return makeImmutable(lazy);
  };
}
