export const isHomepage = (): boolean => location.pathname === '/';

export const handleReloadClick = (): void => location.reload(true);

export const setElVisible = (el: HTMLElement) =>
  (el.style.visibility = 'visible');
