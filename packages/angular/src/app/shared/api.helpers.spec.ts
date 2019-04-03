import { Data } from 'testing';
import {
  CASE_STUDIES,
  getPostUrl,
  isCaseStudy,
  SERVICES,
  createCareerMetaTags,
  isKnownPostType,
  createPostMetaTags
} from './api.helpers';

describe('`isCaseStudy`', () => {
  it('should return `true` if passed `CaseStudy` arg', () => {
    const res = isCaseStudy(Data.Api.getCaseStudies('Case Study 1'));

    expect(res).toBe(true);
  });

  it('should return `false` if passed `Service` arg', () => {
    const res = isCaseStudy(Data.Api.getServices('Service 1'));

    expect(res).toBe(false);
  });
});

describe('`getPostUrl`', () => {
  it('should return `SERVICES` if passed service arg', () => {
    const res = getPostUrl('service');

    expect(res).toBe(SERVICES);
  });

  it('should return `CASE_STUDIES` if passed work arg', () => {
    const res = getPostUrl('work');

    expect(res).toBe(CASE_STUDIES);
  });
});

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

describe('`createCareerMetaTags`', () => {
  it('should return partial `MetaTags` if has `career` arg', () => {
    const res = createCareerMetaTags(Data.Api.getCareers('Career 1'));

    expect(res).toEqual({
      type: 'article',
      title: 'Career 1',
      description: '£0',
      url: 'careers/career-1'
    });
  });

  it('should return not found `MetaTags` if no `career` arg', () => {
    const res = createCareerMetaTags(null);

    expect(res).toEqual({
      title: 'Page not found'
    });
  });
});

describe('`createPostMetaTags`', () => {
  it('should return `MetaTags` if has `post` arg', () => {
    const res = createPostMetaTags(
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

  it('should return not found `MetaTags` if no `post` arg', () => {
    const res = createPostMetaTags('type' as any, 'id', null);

    expect(res).toEqual({
      title: 'Page not found'
    });
  });
});
