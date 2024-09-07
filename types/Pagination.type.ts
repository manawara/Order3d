export type PaginationType = {
  postsPerPage: number;
  countData: number;
};

export type PaginationContext = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleChoosePage: (page: number) => void;
  pageNumber: number;
};
