import { Api } from '../../shared/shared.module';

export const CareersImages: { [name: string]: { image: Api.Image } } = {
  hiring: {
    image: {
      name: 'careers-hiring',
      alt: 'Careers'
    }
  },
  career: {
    image: {
      name: 'career',
      alt: 'Heckford studio'
    }
  }
};
