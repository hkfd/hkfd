import { makeImmutable } from 'testing';

import { Generic as GenericType } from 'shared';

export namespace Generic {
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
}
