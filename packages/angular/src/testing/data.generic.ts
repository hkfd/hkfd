import { Image, Video, Audio } from 'generic';

export namespace Generic {
  export const isImage = (data: any): data is Image => {
    return (
      data.hasOwnProperty('src') &&
      data.hasOwnProperty('srcset') &&
      data.hasOwnProperty('alt')
    );
  };

  export const isVideo = (data: any): data is Video => {
    return data.hasOwnProperty('src');
  };

  export const isAudio = (data: any): data is Audio => {
    return data.hasOwnProperty('url');
  };

  export const getImage = () => {
    const image: Image = {
      src: 'http://testing/example.jpg',
      srcset: 'srcset',
      alt: 'Example image'
    };

    return image;
  };

  export const getDuo = () => {
    const duo: Image[] = [
      {
        src: '',
        srcset: 'srcset',
        alt: ''
      },
      {
        src: '',
        srcset: 'srcset',
        alt: ''
      }
    ];

    return duo;
  };

  export const getImages = () => {
    const images: Image[] = [
      {
        src: 'image-1',
        srcset: 'srcset',
        alt: ''
      },
      {
        src: 'image-2',
        srcset: 'srcset',
        alt: ''
      },
      {
        src: 'image-3',
        srcset: 'srcset',
        alt: ''
      },
      {
        src: 'image-4',
        srcset: 'srcset',
        alt: ''
      },
      {
        src: 'image-5',
        srcset: 'srcset',
        alt: ''
      }
    ];

    return images;
  };

  export const getVideo = () => {
    const video: Video = {
      src: 'src'
    };

    return video;
  };

  export const getAudio = () => {
    const audio: Audio = {
      url: 'http://example.com/'
    };

    return audio;
  };
}
