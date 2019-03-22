import { isHomepage, handleReloadClick, setElVisible } from './banner.helpers';

beforeEach(jest.clearAllMocks);

describe('`isHomepage`', () => {
  beforeEach(() => delete window.location);

  it('should return `true` if `location.pathname` is `/`', () => {
    window.location = {
      pathname: '/'
    } as any;

    expect(isHomepage()).toBe(true);
  });

  it('should return `false` if `location.pathname` is not `/`', () => {
    window.location = {
      pathname: '/page'
    } as any;

    expect(isHomepage()).toBe(false);
  });
});

describe('`handleReloadClick`', () => {
  it('should call `location.reload` with `true` arg', () => {
    window.location = {
      reload: jest.fn()
    } as any;
    handleReloadClick();

    expect(window.location.reload).toHaveBeenCalledWith(true);
  });
});

describe('`setElVisible`', () => {
  it('should set `el` visibility as visible', () => {
    const el = { style: { visibility: undefined } };
    setElVisible(el as any);

    expect(el.style.visibility).toBe('visible');
  });
});
