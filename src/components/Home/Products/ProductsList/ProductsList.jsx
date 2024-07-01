import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/products/products-operation";
import React, { useEffect, useRef } from "react";
import {
  getTotalPages,
  selectFilteredProducts,
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import { List, ListWrapper } from "../List.styled";
import Pagination from "../../Pagination/Pagination";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import Search from "../../Search/Search";
import styled from 'styled-components';
import { theme } from "../../../../styles/theme";
import { Select } from "../../../Busket/CheckoutPage/SelectInput";
import { FaPlusCircle } from "react-icons/fa";
import { Element, animateScroll as scroller } from "react-scroll";

const categories = ["Косплей","Перуки","Аксесуари","Мерч","Lolita fashion","Катани, мечі, зброя","K-pop","Фігурки","Акрилові стенди",]

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;
const CategoryItem = styled.p`
display: flex;
align-items: center;
gap: 5px;
padding: 5px 10px;
border-radius: 6px;
background-color: ${props => props.$active ? `lightgray` : `${theme.colors.ligthGray}`};
cursor: pointer;
&:hover {
background-color: lightgray;
}
`;

const StyledSelect = styled(Select)`
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const ProductsList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const product = useSelector(selectFilteredProducts);
  const page = searchParams.get('page') || 1;
  const pageNum = Number(page);
  const totalPages = useSelector(getTotalPages);
  const scrollPosition = useRef(null);
  const isLoading = useSelector(selectIsLoading);
  const category = searchParams.get('category');
  const price = searchParams.get('price');
  const search = searchParams.get('search');

  useEffect(() => {

    if(!category) {
      searchParams.set('category', '');
      setSearchParams(searchParams)
    }

    if(!price) {
      searchParams.set('price', '');
      setSearchParams(searchParams)
    }

    if (!search && !category && !price && page) {
      dispatch(getProducts({ page: pageNum }));
    } else if (search || category || price) {
      dispatch(getProducts({ page, search: search, category: category, price: price }));
    }
  }, [page, category, search, dispatch, pageNum, searchParams, setSearchParams, price]);

  const handlePagination = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  const handleFilter = (e) => {
    if(!category) {
      searchParams.set('category', e.currentTarget.textContent);
      setSearchParams(searchParams);
    } else {
      // setFilter([]);
      searchParams.set('category', "");
      setSearchParams(searchParams);
      searchParams.set('category', e.currentTarget.textContent);
      setSearchParams(searchParams);
      // setFilter([e.target.textContent]);

    }
  }

  const handlePriceFilter = (e) => {
    const {value} = e.target;
    if(value === "none") {
      searchParams.set('price', '');
      setSearchParams(searchParams);
      return;
    }
    if(!price) {
      searchParams.set('price', value);
      setSearchParams(searchParams);
    } else {
      searchParams.set('price', "");
      setSearchParams(searchParams);
      searchParams.set('price', value);
      setSearchParams(searchParams);
    }
  }

  const resetFilters = (e) => {
    searchParams.set('page', 1);
    searchParams.set('price', "none");
    searchParams.set('category', "");
    searchParams.set('search', "");
    setSearchParams(searchParams);
  }

  return (
    <>
    {/* {isLoading && <Loader />} */}
    <Search setSearchParams={setSearchParams} searchParams={searchParams} />
    <CategoryWrapper>
    {categories.map(item => {
      return <CategoryItem onClick={handleFilter} $active={item === category} key={item}>{item}</CategoryItem>
    })}
    <CategoryItem onClick={resetFilters}>Скинути фільтри<FaPlusCircle style={{rotate: "45deg", fontSize: "14px"}}/></CategoryItem>
    </CategoryWrapper>
    <StyledSelect value={price ? "none" : price} onChange={handlePriceFilter}>
    <option value="none">Сортувати
      </option>
      <option value="low">По-зростанню
      </option>
      <option value="high">
      По-зменьшенню
      </option>
    </StyledSelect>
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
