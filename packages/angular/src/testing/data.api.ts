import { Api as ApiTypes } from 'shared';

export namespace Api {
  export const services: ApiTypes.Service[] = [
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
      intro: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Service 1 introduction'
              }
            ]
          }
        ]
      },
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
      intro: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Service 2 introduction'
              }
            ]
          }
        ]
      },
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
      intro: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Service 3 introduction'
              }
            ]
          }
        ]
      },
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

  export const caseStudies: ApiTypes.CaseStudy[] = [
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
      intro: null,
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
      intro: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Case Study 2 intro'
              }
            ]
          }
        ]
      },
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
      intro: {
        type: 'text',
        data: [
          {
            paragraph: [
              {
                text: 'Case Study 3 intro'
              }
            ]
          }
        ]
      },
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

  export const clients: ApiTypes.Client[] = [
    {
      sector: 'Sector 1',
      list: ['Client 1', 'Client 2', 'Client 3']
    },
    {
      sector: 'Sector 2',
      list: ['Client 4', 'Client 5', 'Client 6']
    }
  ];

  export const careers: ApiTypes.Career[] = [
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

  export const team: ApiTypes.Team[] = [
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

  export const images: ApiTypes.Image[] = [
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

  export const textBlocks: { [name: string]: ApiTypes.Blocks.TextBlock } = {
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

  export const sentence: { [name: string]: ApiTypes.Sentence } = {
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

  export const galleryBlock: ApiTypes.Blocks.GalleryBlock = {
    type: 'gallery',
    data: [
      { image: { name: 'image1', alt: '' } },
      { image: { name: 'image2', alt: '' } },
      { image: { name: 'image3', alt: '' } },
      { image: { name: 'image4', alt: '' } },
      { image: { name: 'image5', alt: '' } }
    ]
  };

  export const duoBlock: ApiTypes.Blocks.DuoBlock = {
    type: 'duo',
    data: [
      { image: { name: 'image1', alt: '' } },
      { image: { name: 'image2', alt: '' } },
      { image: { name: 'image3', alt: '' } }
    ]
  };

  export const image: ApiTypes.Image = {
    name: 'image',
    alt: 'Image'
  };

  export const video: ApiTypes.Video = {
    id: '123'
  };

  export const audio: ApiTypes.Audio = {
    url: 'soundcloud.com'
  };
}
