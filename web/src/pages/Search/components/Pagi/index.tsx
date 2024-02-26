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

export const Pagi = ({
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
          <PaginationItem onClick={() => setPageNumber(i)}>
            <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPage = Math.max(1, pageNumber - Math.floor(visiblePages / 2));
      const endPage = Math.min(startPage + visiblePages - 1, totalPages);

      if (startPage > 1) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem onClick={() => setPageNumber(i)}>
            <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
          </PaginationItem>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];

  //   for (let i = 1; i <= Math.min(totalPages, visiblePages); i++) {
  //     pageNumbers.push(
  //       <PaginationItem onClick={() => setPageNumber(i)}>
  //         <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
  //       </PaginationItem>
  //     );
  //   }

  //   if (totalPages > visiblePages) {
  //     pageNumbers.push(
  //       <PaginationItem>
  //         <PaginationEllipsis />
  //       </PaginationItem>
  //     );

  //     const additionalPagesStart = Math.max(
  //       pageNumber - Math.floor(visiblePages / 2),
  //       1
  //     );
  //     const additionalPagesEnd = Math.min(
  //       additionalPagesStart + visiblePages - 1,
  //       totalPages
  //     );

  //     for (let i = additionalPagesStart; i <= additionalPagesEnd; i++) {
  //       if (i > Math.min(totalPages, visiblePages)) {
  //         pageNumbers.push(
  //           <PaginationItem onClick={() => setPageNumber(i)}>
  //             <PaginationLink isActive={i === pageNumber}>{i}</PaginationLink>
  //           </PaginationItem>
  //         );
  //       }
  //     }
  //   }
  //   return pageNumbers;
  // };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={previousPage}>
          <PaginationPrevious></PaginationPrevious>
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem onClick={nextPage}>
          <PaginationNext></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
