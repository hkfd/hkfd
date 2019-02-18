import { Data } from 'testing';
import { CASE_STUDIES, getPostUrl, isCaseStudy, SERVICES } from './api.helpers';

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
