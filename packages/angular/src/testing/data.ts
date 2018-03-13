import {
  Service,
  Career,
  Post,
  CaseStudy,
  Team,
  TextBlock,
  ImageBlock,
  GalleryBlock,
  DuoBlock,
  VideoBlock,
  AudioBlock,
  Image,
  Sentence
} from '../app/shared/shared.module';

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'Service 1',
    description: 'Service 1 description',
    thumbnail: {
      name: '',
      alt: ''
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
        data: <DuoBlock[]>[
          {
            type: 'duo',
            images: [{ name: 'image1', alt: '' }, { name: 'image2', alt: '' }]
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
      name: '',
      alt: ''
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
        data: <VideoBlock[]>[
          {
            type: 'video',
            id: ''
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
      name: '',
      alt: ''
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
        data: <AudioBlock[]>[
          {
            type: 'audio',
            url: ''
          }
        ]
      }
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Case Study 1',
    featured: false,
    colour: 'white',
    thumbnail: {
      name: '',
      alt: ''
    },
    overview: ['deliverable'],
    intro: null,
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
    colour: 'white',
    thumbnail: {
      name: '',
      alt: ''
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
        data: <ImageBlock[]>[
          {
            type: 'image',
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
      name: '',
      alt: ''
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
        data: <GalleryBlock[]>[
          {
            type: 'gallery',
            images: [
              { name: 'image1', alt: '' },
              { name: 'image2', alt: '' },
              { name: 'image3', alt: '' }
            ]
          }
        ]
      }
    ]
  }
];

export const clients: string[] = ['client1', 'client2', 'client3'];

export const careers: Career[] = [
  {
    title: 'Career 1'
  },
  {
    title: 'Career 2'
  },
  {
    title: 'Career 3'
  }
];

export const team: Team[] = [
  {
    name: 'Person 1',
    position: 'Position 1',
    image: {
      name: '',
      alt: ''
    }
  },
  {
    name: 'Person 2',
    position: 'Position 2',
    image: {
      name: '',
      alt: ''
    }
  },
  {
    name: 'Person 3',
    position: 'Position 3',
    image: {
      name: '',
      alt: ''
    }
  },
  {
    name: 'Person 4',
    position: 'Position 4',
    image: {
      name: '',
      alt: ''
    }
  },
  {
    name: 'Person 5',
    position: 'Position 5',
    image: {
      name: '',
      alt: ''
    }
  }
];

export const images: Image[] = [
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

export const textBlocks: { [name: string]: TextBlock } = {
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

export const sentence: { [name: string]: Sentence } = {
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

export const galleryBlock: GalleryBlock = {
  type: 'gallery',
  images: [
    { name: 'image1', alt: '' },
    { name: 'image2', alt: '' },
    { name: 'image3', alt: '' },
    { name: 'image4', alt: '' },
    { name: 'image5', alt: '' }
  ]
};

export const duoBlock: DuoBlock = {
  type: 'duo',
  images: [
    { name: 'image1', alt: '' },
    { name: 'image2', alt: '' },
    { name: 'image3', alt: '' }
  ]
};
