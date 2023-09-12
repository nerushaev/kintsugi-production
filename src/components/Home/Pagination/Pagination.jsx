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
      {paginationAmount.map((item) => {
        return (
          <PaginationItem
            onClick={handlePagePrev}
            key={item}
            active={item === currentPage}
            disable={
              item > currentPage + 2 || item < currentPage - 1 ? true : false
            }
          >
            {item}
          </PaginationItem>
        );
      })}
    </PaginationWrapper>
  );
}
