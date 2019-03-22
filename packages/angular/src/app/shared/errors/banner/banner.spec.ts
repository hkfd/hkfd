import { setupReloadAction, setupHomeAction, setupBanner } from './banner';
import * as Banner from './banner';
import { handleReloadClick, isHomepage, setElVisible } from './banner.helpers';

jest.spyOn(document, 'getElementById');
jest.spyOn(Banner, 'setupReloadAction');
jest.spyOn(Banner, 'setupHomeAction');

jest.mock('./banner.helpers', () => ({
  handleReloadClick: jest.fn(),
  isHomepage: jest.fn(),
  setElVisible: jest.fn()
}));

beforeEach(jest.clearAllMocks);

describe('`setupReloadAction`', () => {
  it('should set `el` click event listener to call `handleReloadClick`', () => {
    const el = { addEventListener: jest.fn() };
    setupReloadAction(el as any);

    expect(el.addEventListener).toHaveBeenCalledWith(
      'click',
      handleReloadClick
    );
  });
});

describe('`setupHomeAction`', () => {
  it('should call `isHomepage`', () => {
    setupHomeAction('el' as any);

    expect(isHomepage).toHaveBeenCalled();
  });

  it('should not call `setElVisible` if `isHomepage` returns `true`', () => {
    (isHomepage as jest.Mock).mockReturnValue(true);
    setupHomeAction('el' as any);

    expect(setElVisible).not.toHaveBeenCalled();
  });

  it('should call `setElVisible` with `el` arg', () => {
    (isHomepage as jest.Mock).mockReturnValue(false);
    setupHomeAction('el' as any);

    expect(setElVisible).toHaveBeenCalledWith('el');
  });
});

describe('`setupBanner`', () => {
  it('should call `document.getElementById` with reload el arg', () => {
    setupBanner();

    expect(document.getElementById).toHaveBeenCalledWith('action-reload');
  });

  it('should call `document.getElementById` with home el arg', () => {
    setupBanner();

    expect(document.getElementById).toHaveBeenCalledWith('action-home');
  });

  describe('Reload', () => {
    it('should call `setupReloadAction` with `reloadEl` arg if has `reloadEl`', () => {
      const el = { addEventListener: jest.fn() };
      (document.getElementById as jest.Mock).mockReturnValue(el);
      setupBanner();

      expect(setupReloadAction).toHaveBeenCalledWith(el);
    });

    it('should not call `setupReloadAction` if no `reloadEl`', () => {
      (document.getElementById as jest.Mock).mockReturnValue(null);
      setupBanner();

      expect(setupReloadAction).not.toHaveBeenCalled();
    });
  });

  describe('Home', () => {
    it('should call `setupHomeAction` with `homeEl` arg if has `homeEl`', () => {
      const el = { addEventListener: jest.fn() };
      (document.getElementById as jest.Mock).mockReturnValue(el);
      setupBanner();

      expect(setupHomeAction).toHaveBeenCalledWith(el);
    });

    it('should not call `setupHomeAction` if no `homeEl`', () => {
      (document.getElementById as jest.Mock).mockReturnValue(null);
      setupBanner();

      expect(setupHomeAction).not.toHaveBeenCalled();
    });
  });
});
