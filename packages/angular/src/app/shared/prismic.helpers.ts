export const POST_PAGE_SIZE = 9;

export const getNewPageSize = (
  firstLoad: boolean,
  currentPage: number
): number => (firstLoad ? currentPage * POST_PAGE_SIZE : POST_PAGE_SIZE);

export const getNewPage = (firstLoad: boolean, currentPage: number): number =>
  firstLoad ? 1 : currentPage;
