import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
  visiblePages: number;
  nextPage: () => void;
  previousPage: () => void;
}

export const Paginate = ({
  pageNumber,
  setPageNumber,
  totalPages,
  visiblePages,
  nextPage,
  previousPage,
}: Props) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem
            key={i}
            onClick={() => setPageNumber(i)}
            className="cursor-pointer"
          >
            <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPage = Math.max(1, pageNumber - Math.floor(visiblePages / 2));
      const endPage = Math.min(startPage + visiblePages - 1, totalPages);

      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem
            key={i}
            onClick={() => setPageNumber(i)}
            className="cursor-pointer"
          >
            <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={previousPage} className="cursor-pointer">
          <PaginationPrevious></PaginationPrevious>
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem onClick={nextPage} className="cursor-pointer">
          <PaginationNext></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
