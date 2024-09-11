import React from "react";
import { PaginationWrapper, PaginationItem } from "./Pagination.styled";
import { useSearchParams } from "react-router-dom";
import { scroller } from "react-scroll";
import { useSelector } from "react-redux";
import { getCurrentPage, getTotalPages } from "../../../redux/products/products-selectors";

export default function Pagination() {
  const totalPages = useSelector(getTotalPages);
  const currentPage = useSelector(getCurrentPage);
  const [searchParams, setSearchParams] = useSearchParams();
  function makeArray(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

    const handlePagination = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  const paginationAmount = makeArray(totalPages);

  return (
    <PaginationWrapper>
      {currentPage > 2 && 
      <>
      <PaginationItem onClick={() => handlePagination(1)}>1</PaginationItem>
      <PaginationItem>...</PaginationItem>
      </>
      }
      {paginationAmount.map((item) => {
        return (
          <PaginationItem
            onClick={() => handlePagination(item)}
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
      <PaginationItem onClick={() => handlePagination(totalPages)}>{totalPages}</PaginationItem>
      </>
      }
    </PaginationWrapper>
  );
}
