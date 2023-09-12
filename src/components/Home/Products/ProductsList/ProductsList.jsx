import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/products/products-operation";
import React, { useEffect, useRef, useState } from "react";
import {
  getTotalPages,
  selectFilteredProducts,
} from "../../../../redux/products/products-selectors";
import { getFilter } from "../../../../redux/filter/filter-selectors";
import { List, ListWrapper } from "../List.styled";
import FilterPanel from "../../FilterPanel/FilterPanel";
import Pagination from "../../Pagination/Pagination";
import { getSearch } from "../../../../redux/search/search-selectors";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const ProductsList = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectFilteredProducts);
  const [page, setPage] = useState(1);
  const totalPages = useSelector(getTotalPages);
  const filter = useSelector(getFilter);
  const scrollPosition = useRef(null);
  const search = useSelector(getSearch);

  function getObjectKeysString(obj) {
    let keys = Object.keys(obj);
    let result = "";
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]]) {
        result += `${keys[i]}${i < keys.length - 1 ? "," : ""}`;
      }
    }
    return result;
  }

  useEffect(() => {
    if (!search && !Object.values(filter).includes(true)) {
      dispatch(getProducts({ page }));
    } else if (search || filter) {
      if (page > 1) {
        setPage(1);
        const result = getObjectKeysString(filter);
        dispatch(getProducts({ page: 1, search: search, filter: result }));
      }
      const result = getObjectKeysString(filter);
      dispatch(getProducts({ page, search: search, filter: result }));
    }
  }, [page, filter, search, dispatch]);

  const handlePagination = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    const page = parseInt(textContent);
    setPage(page);
    scrollPosition.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <FilterPanel /> */}
      <ListWrapper>
        {product.length < 1 && (
          <ErrorMessage message="Нажаль, по-вашому запиту нічого не знайшлось..." />
        )}
        <List ref={scrollPosition}>
          <ProductsItem data={product} />
        </List>
      </ListWrapper>
      {/* <Pagination
        handlePagePrev={handlePagination}
        totalPages={totalPages}
        currentPage={page}
      /> */}
    </>
  );
};

export default ProductsList;
