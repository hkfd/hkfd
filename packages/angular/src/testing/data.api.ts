import { makeImmutable } from 'testing';

import { Api as ApiTypes } from 'shared';

export namespace Api {
  export const getServices = <
    T extends void | 'Service 1' | 'Service 2' | 'Service 3'
  >(
    title?: T
  ): T extends string ? ApiTypes.Service : ApiTypes.Service[] => {
    const services: ApiTypes.Service[] = [
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
            data: <ApiTypes.Blocks.DuoBlock[]>[
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
            data: <ApiTypes.Blocks.VideoBlock[]>[
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
            data: <ApiTypes.Blocks.AudioBlock[]>[
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

    if (!title) return makeImmutable(services) as any;

    const foundService = services.find(service => service.title === title);
    return makeImmutable(foundService) as any;
  };

  export const getCaseStudies = <
    T extends void | 'Case Study 1' | 'Case Study 2' | 'Case Study 3'
  >(
    title?: T
  ): T extends string ? ApiTypes.CaseStudy : ApiTypes.CaseStudy[] => {
    const caseStudies: ApiTypes.CaseStudy[] = [
      {
        id: 'case-study-1',
        title: 'Case Study 1',
        featured: true,
        colour: 'white',
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
            data: <ApiTypes.Blocks.TextBlock[]>[
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
            data: <ApiTypes.Blocks.ImageBlock[]>[
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
            data: <ApiTypes.Blocks.GalleryBlock[]>[
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

    if (!title) return makeImmutable(caseStudies) as any;

    const foundCaseStudy = caseStudies.find(
      caseStudy => caseStudy.title === title
    );
    return makeImmutable(foundCaseStudy) as any;
  };

  export const getClients = () => {
    const clients: ApiTypes.Client[] = [
      {
        sector: 'Sector 1',
        list: ['Client 1', 'Client 2', 'Client 3']
      },
      {
        sector: 'Sector 2',
        list: ['Client 4', 'Client 5', 'Client 6']
      }
    ];

    return makeImmutable(clients);
  };

  export const getCareers = <
    T extends void | 'Career 1' | 'Career 2' | 'Career 3'
  >(
    title?: T
  ): T extends string ? ApiTypes.Career : ApiTypes.Career[] => {
    const careers: ApiTypes.Career[] = [
      {
        id: 'career-1',
        title: 'Career 1',
        salary: '£0',
        content: [
          {
            title: 'TextBlock',
            data: <ApiTypes.Blocks.TextBlock[]>[
              {
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        id: 'career-2',
        title: 'Career 2',
        salary: '£0',
        content: [
          {
            data: <ApiTypes.Blocks.TextBlock[]>[
              {
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        id: 'career-3',
        title: 'Career 3',
        salary: '£0',
        content: [
          {
            data: <ApiTypes.Blocks.TextBlock[]>[
              {
                type: 'text'
              }
            ]
          }
        ]
      }
    ];

    if (!title) return makeImmutable(careers) as any;

    const foundCareer = careers.find(career => career.title === title);
    return makeImmutable(foundCareer) as any;
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
  ): T extends string ? ApiTypes.Team : ApiTypes.Team[] => {
    const team: ApiTypes.Team[] = [
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

    if (!name) return makeImmutable(team) as any;

    const foundPerson = team.find(person => person.name === name);
    return makeImmutable(foundPerson) as any;
  };

  export const getImages = () => {
    const images: ApiTypes.Image[] = [
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

    return makeImmutable(images);
  };

  export const getTextBlocks = <T extends 'text' | 'list'>(
    type: T
  ): ApiTypes.Blocks.TextBlock => {
    const textBlocks: { [name: string]: ApiTypes.Blocks.TextBlock } = {
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
    return makeImmutable(textBlock) as any;
  };

  export const getSentence = <
    T extends 'url' | 'heading' | 'bold' | 'italic' | 'normal'
  >(
    type: T
  ): ApiTypes.Sentence => {
    const sentences: { [name: string]: ApiTypes.Sentence } = {
      url: {
        text: 'Click here',
        url: 'http://example.com'
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
    return makeImmutable(sentence) as any;
  };

  export const getGalleryBlock = () => {
    const galleryBlock: ApiTypes.Blocks.GalleryBlock = {
      type: 'gallery',
      data: [
        { image: { name: 'image1', alt: '' } },
        { image: { name: 'image2', alt: '' } },
        { image: { name: 'image3', alt: '' } },
        { image: { name: 'image4', alt: '' } },
        { image: { name: 'image5', alt: '' } }
      ]
    };

    return makeImmutable(galleryBlock);
  };

  export const getDuoBlock = () => {
    const duoBlock: ApiTypes.Blocks.DuoBlock = {
      type: 'duo',
      data: [
        { image: { name: 'image1', alt: '' } },
        { image: { name: 'image2', alt: '' } },
        { image: { name: 'image3', alt: '' } }
      ]
    };

    return makeImmutable(duoBlock);
  };

  export const getImage = () => {
    const image: ApiTypes.Image = {
      name: 'image',
      alt: 'Image'
    };

    return makeImmutable(image);
  };

  export const getVideo = () => {
    const video: ApiTypes.Video = {
      id: '123'
    };

    return makeImmutable(video);
  };

  export const getAudio = () => {
    const audio: ApiTypes.Audio = {
      url: 'soundcloud.com'
    };

    return makeImmutable(audio);
  };
}
