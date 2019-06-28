import { createTitle } from './meta.service.helpers';

describe('`createTitle`', () => {
  it('should return default title if not passed `title`', () => {
    const res = createTitle({});

    expect(res).toBe('Heckford');
  });

  it('should return title if passed `title`', () => {
    const res = createTitle({ title: 'Title' });

    expect(res).toBe('Heckford – Title');
  });
});
