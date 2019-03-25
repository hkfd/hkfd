import { Data } from 'testing';

import { createMetaTags } from './career-resolver.helpers';

describe('`createMetaTags`', () => {
  it('should return partial `MetaTags`', () => {
    const res = createMetaTags(Data.Api.getCareers('Career 1'));

    expect(res).toEqual({
      type: 'article',
      title: 'Career 1',
      description: '£0',
      url: 'careers/career-1'
    });
  });
});
