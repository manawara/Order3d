export type PaginationType = {
  postsPerPage: number;
  countData: number;
} & PaginationContext;

export type PaginationContext = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleChoosePage: (page: number) => void;
  resetPagination?: (() => void) | undefined;
  pageNumber: number;
};
