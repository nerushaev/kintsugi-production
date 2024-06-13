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
      {currentPage >=3 && 
      <>
      <PaginationItem>1</PaginationItem>
      <PaginationItem>...</PaginationItem>
      </>
      }
      {paginationAmount.map((item) => {
        return (
          <PaginationItem
            onClick={handlePagePrev}
            key={item}
            $active={item === Number(currentPage)}
            $disable={
              item > currentPage + 2 || item < currentPage - 1 ? true : false
            }
          >
            {item}
          </PaginationItem>
        );
      })}
      {currentPage < totalPages - 2 && 
      <>
      <PaginationItem>...</PaginationItem>
      <PaginationItem>{totalPages}</PaginationItem>
      </>
      }
    </PaginationWrapper>
  );
}
