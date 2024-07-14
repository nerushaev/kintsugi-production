import React from "react";
import { PaginationWrapper, PaginationItem } from "./Pagination.styled";

export default function Pagination({
  totalPages,
  currentPage,
  handlePagePrev,
}) {
  function makeArray(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  const paginationAmount = makeArray(totalPages);

  return (
    <PaginationWrapper>
      {currentPage > 2 && 
      <>
      <PaginationItem onClick={() => handlePagePrev(1)}>1</PaginationItem>
      <PaginationItem>...</PaginationItem>
      </>
      }
      {paginationAmount.map((item) => {
        return (
          <PaginationItem
            onClick={() => handlePagePrev(item)}
            key={item}
            $active={item === currentPage}
            $disable={
              item + 1 < currentPage || item - 1 > currentPage ? true : false
            }
          >
            {item}
          </PaginationItem>
        );
      })}
      {currentPage < totalPages - 1 && 
      <>
      <PaginationItem>...</PaginationItem>
      <PaginationItem onClick={() => handlePagePrev(totalPages)}>{totalPages}</PaginationItem>
      </>
      }
    </PaginationWrapper>
  );
}
