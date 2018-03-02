import {
  Service,
  Career,
  Post,
  CaseStudy,
  Team,
  Image
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
        data: [
          {
            type: 'text'
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
        data: [
          {
            type: 'text'
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
    intro: {
      type: 'text',
      data: [
        {
          paragraph: [
            {
              text: 'Case Study 1 intro'
            }
          ]
        }
      ]
    },
    content: [
      {
        title: 'Title',
        data: [
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
        title: 'Title',
        data: [
          {
            type: 'text'
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
        title: 'Title',
        data: [
          {
            type: 'text'
          }
        ]
      }
    ]
  }
];

export const clients: Image[] = [
  {
    name: 'client-1',
    alt: ''
  },
  {
    name: 'client-2',
    alt: ''
  }
];

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
