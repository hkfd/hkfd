import {
  DuoBlock,
  VideoBlock,
  AudioBlock,
  TextBlock,
  ImageBlock,
  GalleryBlock,
  Service,
  CaseStudy,
  Client,
  Team,
  Image,
  Sentence,
  Video,
  Audio,
  ImageBlockData,
  VideoBlockData,
  AudioBlockData,
  DuoBlockData,
  GalleryBlockData
} from 'api';

export namespace Api {
  export const getServices = <
    T extends void | 'Service 1' | 'Service 2' | 'Service 3'
  >(
    title?: T
  ): T extends string ? Service : Service[] => {
    const services: Service[] = [
      {
        id: 'service-1',
        title: 'Service 1',
        description: 'Service 1 description',
        thumbnail: {
          image: {
            name: 'service-1',
            alt: ''
          }
        },
        intro: ['Service 1 intro'],
        content: [
          {
            title: 'DuoBlock',
            data: <DuoBlock[]>[
              {
                type: 'duo',
                data: [
                  { image: { name: 'image1', alt: '' } },
                  { image: { name: 'image2', alt: '' } }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'service-2',
        title: 'Service 2',
        description: 'Service 2 description',
        thumbnail: {
          image: {
            name: 'service-2',
            alt: ''
          }
        },
        intro: ['Service 2 intro'],
        content: [
          {
            title: 'VideoBlock',
            data: <VideoBlock[]>[
              {
                type: 'video',
                data: {
                  video: {
                    id: ''
                  }
                }
              }
            ]
          }
        ]
      },
      {
        id: 'service-3',
        title: 'Service 3',
        description: 'Service 3 description',
        thumbnail: {
          image: {
            name: 'service-3',
            alt: ''
          }
        },
        intro: ['Service 3 intro'],
        content: [
          {
            title: 'AudioBlock',
            data: <AudioBlock[]>[
              {
                type: 'audio',
                data: {
                  audio: {
                    url: ''
                  }
                }
              }
            ]
          }
        ]
      }
    ];

    if (!title) return services as any;

    const foundService = services.find(service => service.title === title);
    return foundService as any;
  };

  export const getCaseStudies = <
    T extends void | 'Case Study 1' | 'Case Study 2' | 'Case Study 3'
  >(
    title?: T
  ): T extends string ? CaseStudy : CaseStudy[] => {
    const caseStudies: CaseStudy[] = [
      {
        id: 'case-study-1',
        title: 'Case Study 1',
        featured: true,
        colour: 'white',
        sector: 'Sector 1',
        thumbnail: {
          image: {
            name: '',
            alt: ''
          }
        },
        overview: ['deliverable'],
        intro: ['Case Study 1 intro'],
        content: [
          {
            title: 'TextBlock',
            data: <TextBlock[]>[
              {
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        id: 'case-study-2',
        title: 'Case Study 2',
        featured: true,
        colour: 'black',
        sector: 'Sector 2',
        thumbnail: {
          image: {
            name: '',
            alt: ''
          }
        },
        overview: ['deliverable'],
        intro: ['Case Study 2 intro'],
        content: [
          {
            title: 'ImageBlock',
            data: <ImageBlock[]>[
              {
                type: 'image',
                data: {
                  image: {
                    name: '',
                    alt: ''
                  }
                },
                fullBleed: true
              }
            ]
          }
        ]
      },
      {
        id: 'case-study-3',
        title: 'Case Study 3',
        featured: false,
        colour: 'white',
        sector: 'Sector 3',
        thumbnail: {
          image: {
            name: '',
            alt: ''
          }
        },
        overview: ['deliverable'],
        intro: ['Case Study 3 intro'],
        content: [
          {
            title: 'GalleryBlock',
            data: <GalleryBlock[]>[
              {
                type: 'gallery',
                data: [
                  { image: { name: 'image1', alt: '' } },
                  { image: { name: 'image2', alt: '' } },
                  { image: { name: 'image3', alt: '' } }
                ]
              }
            ]
          }
        ]
      }
    ];

    if (!title) return caseStudies as any;

    const foundCaseStudy = caseStudies.find(
      caseStudy => caseStudy.title === title
    );
    return foundCaseStudy as any;
  };

  export const getClients = () => {
    const clients: Client[] = [
      {
        sector: 'Sector 1',
        list: ['Client 1', 'Client 2', 'Client 3']
      },
      {
        sector: 'Sector 2',
        list: ['Client 4', 'Client 5', 'Client 6']
      }
    ];

    return clients;
  };

  export const getTeam = <
    T extends
      | void
      | 'Person 1'
      | 'Person 2'
      | 'Person 3'
      | 'Person 4'
      | 'Person 5'
  >(
    name?: T
  ): T extends string ? Team : Team[] => {
    const team: Team[] = [
      {
        name: 'Person 1',
        position: 'Position 1',
        thumbnail: {
          image: {
            name: 'person-1',
            alt: ''
          }
        }
      },
      {
        name: 'Person 2',
        position: 'Position 2',
        thumbnail: {
          image: {
            name: 'person-2',
            alt: ''
          }
        }
      },
      {
        name: 'Person 3',
        position: 'Position 3',
        thumbnail: {
          image: {
            name: 'person-3',
            alt: ''
          }
        }
      },
      {
        name: 'Person 4',
        position: 'Position 4',
        thumbnail: {
          image: {
            name: 'person-4',
            alt: ''
          }
        }
      },
      {
        name: 'Person 5',
        position: 'Position 5',
        thumbnail: {
          image: {
            name: 'person-5',
            alt: ''
          }
        }
      }
    ];

    if (!name) return team as any;

    const foundPerson = team.find(person => person.name === name);
    return foundPerson as any;
  };

  export const getImages = () => {
    const images: Image[] = [
      {
        name: 'image-1',
        alt: ''
      },
      {
        name: 'image-2',
        alt: ''
      },
      {
        name: 'image-3',
        alt: ''
      },
      {
        name: 'image-4',
        alt: ''
      },
      {
        name: 'image-5',
        alt: ''
      }
    ];

    return images;
  };

  export const getTextBlocks = <T extends 'text' | 'list'>(
    type: T
  ): TextBlock => {
    const textBlocks: { [name: string]: TextBlock } = {
      text: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Paragraph 1, Sentence 1.'
              },
              {
                text: 'Paragraph 1, Sentence 2.'
              }
            ]
          },
          {
            paragraph: [
              {
                text: 'Paragraph 2, Sentence 1.'
              },
              {
                text: 'Paragraph 2, Sentence 2.'
              },
              {
                text: 'Paragraph 2, Sentence 3.'
              }
            ]
          }
        ]
      },
      list: {
        type: 'text',
        data: [
          {
            list: [
              {
                text: 'List 1, Item 1'
              },
              {
                text: 'List 1, Item 2'
              },
              {
                text: 'List 1, Item 3'
              }
            ]
          },
          {
            list: [
              {
                text: 'List 2, Item 1'
              },
              {
                text: 'List 2, Item 2'
              }
            ]
          }
        ]
      }
    };

    const textBlock = textBlocks[type];
    return textBlock as any;
  };

  export const getSentence = <
    T extends 'url' | 'heading' | 'bold' | 'italic' | 'normal'
  >(
    type: T
  ): Sentence => {
    const sentences: { [name: string]: Sentence } = {
      url: {
        text: 'Click here',
        url: 'http://example.com/'
      },
      heading: {
        text: 'Heading',
        attributes: { heading: true }
      },
      bold: {
        text: 'Bold sentence.',
        attributes: { bold: true }
      },
      italic: {
        text: 'Italic sentence.',
        attributes: { italic: true }
      },
      normal: {
        text: 'Normal sentence.'
      }
    };

    const sentence = sentences[type];
    return sentence as any;
  };

  export const getImage = () => {
    const image: Image = {
      name: 'image',
      alt: 'Image'
    };

    return image;
  };

  export const getImageBlockData = () => {
    const data: ImageBlockData = {
      image: getImage()
    };

    return data;
  };

  export const getGalleryBlock = () => {
    const galleryBlock: GalleryBlock = {
      type: 'gallery',
      data: [
        { image: { name: 'image1', alt: '' } },
        { image: { name: 'image2', alt: '' } },
        { image: { name: 'image3', alt: '' } },
        { image: { name: 'image4', alt: '' } },
        { image: { name: 'image5', alt: '' } }
      ]
    };

    return galleryBlock;
  };

  export const getGalleryBlockData = () => {
    const data: GalleryBlockData = [
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      },
      {
        image: getImage()
      }
    ];

    return data;
  };

  export const getDuoBlock = () => {
    const duoBlock: DuoBlock = {
      type: 'duo',
      data: [
        { image: { name: 'image1', alt: '' } },
        { image: { name: 'image2', alt: '' } },
        { image: { name: 'image3', alt: '' } }
      ]
    };

    return duoBlock;
  };

  export const getDuoBlockData = () => {
    const data: DuoBlockData = [
      {
        image: getImage()
      },
      {
        image: getImage()
      }
    ];

    return data;
  };

  export const getVideo = () => {
    const video: Video = {
      id: '123'
    };

    return video;
  };

  export const getVideoBlockData = () => {
    const data: VideoBlockData = {
      video: getVideo()
    };

    return data;
  };

  export const getAudio = () => {
    const audio: Audio = {
      url: 'soundcloud.com'
    };

    return audio;
  };

  export const getAudioBlockData = () => {
    const data: AudioBlockData = {
      audio: getAudio()
    };

    return data;
  };
}
