import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/products/products-operation";
import React, { useEffect, useState } from "react";
import {
  getTotalPages,
  selectFilteredProducts,
} from "../../../../redux/products/products-selectors";
import { List, ListWrapper } from "../List.styled";
import Pagination from "../../Pagination/Pagination";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import Search from "../../Search/Search";
import styled from 'styled-components';
import { theme } from "../../../../styles/theme";
import { Select } from "../../../Busket/CheckoutPage/SelectInput";
import { FaPlusCircle } from "react-icons/fa";
import { Element, scroller } from "react-scroll";
import useModal from '../../../../hooks/modal';
import Modal from '../../../Modal/Modal';
import AddButtonWithSize from "../AddButtonWithSize/AddButtonWithSize";
import { Button, ButtonWrapper } from "../../../Buttons/Buttons";
import { addToBusket } from "../../../../redux/products/products-slice";

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
color: ${props => props.$accent ? `${theme.colors.redAccent}` : "none"};
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px 40px;
  padding-top: 60px;
`;

const ProductsList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {openModal, closeModal, isModalOpen} = useModal();
  const product = useSelector(selectFilteredProducts);
  const page = searchParams.get('page') || 1;
  const pageNum = Number(page);
  const totalPages = useSelector(getTotalPages);
  const category = searchParams.get('category');
  const price = searchParams.get('price');
  const search = searchParams.get('search');
  const [modalProduct, setModalProduct] = useState([]);
  const [activeSize, setActiveSize] = useState();


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

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
  });
  };

  const handleFilter = (e) => {
    if(!category) {
      searchParams.set('category', e.currentTarget.textContent);
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    } else {
      // setFilter([]);
      searchParams.set('category', "");
      setSearchParams(searchParams);
      searchParams.set('category', e.currentTarget.textContent);
      searchParams.set('page', 1);
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

  const handleItemWithSize = (data) => {
    setActiveSize(data.modifications[0].modificator_name);
    setModalProduct(data);
    openModal();
  }

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
    closeModal();
  };


  return (
    <>
    {/* {isLoading && <Loader />} */}
    <Element name="scroll">
    <Search setSearchParams={setSearchParams} searchParams={searchParams} />
    </Element>
    <CategoryWrapper>
    {categories.map(item => {
      return <CategoryItem onClick={handleFilter} $active={item === category} key={item}>{item}</CategoryItem>
    })}
    <CategoryItem $accent onClick={resetFilters}>Скинути фільтри<FaPlusCircle style={{rotate: "45deg", fontSize: "14px"}}/></CategoryItem>
    </CategoryWrapper>
    <StyledSelect value={!price ? "none" : price} onChange={handlePriceFilter}>
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
          <List>
          
          <ProductsItem key={nanoid()} data={product} handleItemWithSize={handleItemWithSize}/>
        </List>

        </ListWrapper>
      <Pagination
        handlePagePrev={handlePagination}
        totalPages={totalPages}
        currentPage={pageNum}
      />
      {isModalOpen && 
      <Modal onCloseModal={closeModal}>
        <ModalWrapper>
          <p>Оберіть розмір</p>
          <AddButtonWithSize activeSize={activeSize} modifications={modalProduct.modifications} setActiveSize={setActiveSize}  />
          <ButtonWrapper>
            <Button onClick={() => handleClick({
              product_id: modalProduct.product_id,
              product_name: modalProduct.product_name,
              description: modalProduct.description,
              photo: modalProduct.photo,
              price: modalProduct.price,
              amount: modalProduct.amount,
              category_name: modalProduct.category_name,
              size: activeSize
            })}>Додати у кошик</Button>
          </ButtonWrapper>
          </ModalWrapper>
      </Modal>
      }
      
    </>
  );
};

export default ProductsList;