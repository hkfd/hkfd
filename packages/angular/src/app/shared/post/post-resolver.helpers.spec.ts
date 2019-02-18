import { isKnownPostType } from './post-resolver.helpers';

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
