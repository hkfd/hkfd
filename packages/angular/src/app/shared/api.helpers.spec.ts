import { getPostUrl, SERVICES, CASE_STUDIES } from './api.helpers';

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
