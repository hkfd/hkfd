import { Generic as GenericType } from 'shared';

export namespace Generic {
  export const image: GenericType.Image = {
    src: 'http://testing/example.jpg',
    srcset: {
      attr: 'srcset',
      val: ['']
    },
    alt: 'Example image'
  };

  export const duo: GenericType.Image[] = [
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

  export const images: GenericType.Image[] = [
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

  export const video: GenericType.Video = {
    src: {
      attr: 'src',
      val: ['']
    }
  };

  export const audio: GenericType.Audio = {
    url: 'http://example.com/'
  };
}
