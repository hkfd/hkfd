import { Data } from 'testing';
import { isKnownPostType, createMetaTags } from './post-resolver.helpers';

describe('`isKnownPostType`', () => {
  it('should return `true` when passed `type` arg as work', () => {
    const res = isKnownPostType('work');

    expect(res).toBe(true);
  });

  it('should return `true` when passed `type` arg as service', () => {
    const res = isKnownPostType('service');

    expect(res).toBe(true);
  });

  it('should return `false` when passed unknown `type` arg', () => {
    const res = isKnownPostType('type');

    expect(res).toBe(false);
  });
});

describe('`createMetaTags`', () => {
  it('should return `MetaTags`', () => {
    const res = createMetaTags(
      'type' as any,
      'id',
      Data.Api.getServices('Service 1')
    );

    expect(res).toEqual({
      type: 'article',
      title: 'Service 1',
      description: 'Service 1 intro',
      url: 'type/id',
      image:
        'https://res.cloudinary.com/dv8oeiozq/image/upload/w_2400,h_ih,c_limit,q_auto,f_auto/service-1'
    });
  });
});
