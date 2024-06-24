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
      <PaginationItem onClick={() => handlePagePrev(1)}>1</PaginationItem>
      <PaginationItem>...</PaginationItem>
      </>
      }
      {paginationAmount.map((item) => {
        return (
          <PaginationItem
            onClick={() => handlePagePrev(item)}
            key={item}
            $active={item === Number(currentPage)}
            $disable={
              item + 1 < Number(currentPage) || item - 1 > Number(currentPage) ? true : false
            }
          >
            {item}
          </PaginationItem>
        );
      })}
      {currentPage < totalPages - 2 && 
      <>
      <PaginationItem>...</PaginationItem>
      <PaginationItem onClick={() => handlePagePrev(totalPages)}>{totalPages}</PaginationItem>
      </>
      }
    </PaginationWrapper>
  );
}
