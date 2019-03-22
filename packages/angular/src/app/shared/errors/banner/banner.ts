import { handleReloadClick, isHomepage, setElVisible } from './banner.helpers';

export const setupReloadAction = (el: HTMLElement) =>
  el.addEventListener('click', handleReloadClick);

export const setupHomeAction = (el: HTMLElement) =>
  !isHomepage() && setElVisible(el);

export const setupBanner = () => {
  const reloadEl = document.getElementById('action-reload');
  const homeEl = document.getElementById('action-home');

  if (reloadEl) setupReloadAction(reloadEl);
  if (homeEl) setupHomeAction(homeEl);
};
