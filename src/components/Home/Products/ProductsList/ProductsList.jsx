import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/products/products-operation";
import React, { useEffect, useRef } from "react";
import {
  getTotalPages,
  selectFilteredProducts,
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import { getFilter } from "../../../../redux/filter/filter-selectors";
import { List, ListWrapper } from "../List.styled";
import FilterPanel from "../../FilterPanel/FilterPanel";
import Pagination from "../../Pagination/Pagination";
import { getSearch } from "../../../../redux/search/search-selectors";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import Search from "../../Search/Search";

const ProductsList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const product = useSelector(selectFilteredProducts);
  const page = searchParams.get('page') || 1;
  const pageNum = Number(page);
  const totalPages = useSelector(getTotalPages);
  const filter = useSelector(getFilter);
  const scrollPosition = useRef(null);
  const search = useSelector(getSearch);
  const isLoading = useSelector(selectIsLoading);

  function getObjectKeysString(obj) {
    let keys = Object.keys(obj);
    let result = "";
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]]) {
        result += `${keys[i]}${i < keys.length - 2 ? "," : ""}`;
      }
    }
    return result;
  }

  useEffect(() => {
    if (!search && !Object.values(filter).includes(true) && page) {
      dispatch(getProducts({ page: pageNum }));
    } else if (search || filter) {
      const result = getObjectKeysString(filter);
      dispatch(getProducts({ page, search: search, filter: result }));
    }
  }, [page, filter, search, dispatch, pageNum]);

  const handlePagination = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  return (
    <>
    {isLoading && <Loader />}
    <Search setSearchParams={setSearchParams} />
    <FilterPanel getObjectKeysString={getObjectKeysString} />
        {product.length < 1 && (
          <ErrorMessage message="Нажаль, по-вашому запиту нічого не знайшлось..." />
        )}
        <ListWrapper>
        <List ref={scrollPosition}>
          <ProductsItem key={nanoid()} data={product} />
        </List>
        </ListWrapper>
      <Pagination
        handlePagePrev={handlePagination}
        totalPages={totalPages}
        currentPage={pageNum}
      />
    </>
  );
};

export default ProductsList;
