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

export const casestudies: CaseStudy[] = [
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
