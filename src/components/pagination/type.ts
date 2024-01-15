export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}
