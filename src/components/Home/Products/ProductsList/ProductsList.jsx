import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../redux/products/products-operation";
import React, { useEffect, useState } from "react";
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
import Search from "../../Search/Search";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { Select } from "../../../Busket/CheckoutPage/SelectInput";
import { FaPlusCircle } from "react-icons/fa";
import { Element, scroller } from "react-scroll";
import useModal from "../../../../hooks/modal";
import Modal from "../../../Modal/Modal";
import AddButtonWithSize from "../AddButtonWithSize/AddButtonWithSize";
import { Button, ButtonWrapper } from "../../../Buttons/Buttons";
import { addToBusket } from "../../../../redux/products/products-slice";
import { useAuth } from "../../../../hooks/useAuth";
import { FormWrapper } from "../../../Form/Form.styled";
import { CloseWrapper, StyledModal } from "../../../../pages/CheckoutPage";
import { SlClose } from "react-icons/sl";
import LoginForm from "../../../Auth/LoginForm/LoginForm";

const categories = [
  "Косплей",
  "Перуки",
  "Аксесуари",
  "Мерч",
  "Lolita fashion",
  "Катани, мечі, зброя",
  "K-pop",
  "Фігурки",
  "Акрилові стенди",
];

const CategoryWrapper = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
`;
const CategoryItem = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$active ? `lightgray` : `${theme.colors.ligthGray}`};
  color: ${(props) => (props.$accent ? `${theme.colors.redAccent}` : "none")};
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const StyledSelect = styled(Select)`
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: white;
`;

export const ModalWrapper = styled.div`
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
  const {
    openModal: openModalSize,
    closeModal: closeModalSize,
    isModalOpen: isModalOpenSize,
  } = useModal();
  const {
    openModal: openModalLogin,
    closeModal: closeModalLogin,
    isModalOpen: isModalOpenLogin,
  } = useModal();
  const product = useSelector(selectFilteredProducts);
  const page = searchParams.get("page") || 1;
  const pageNum = Number(page);
  const totalPages = useSelector(getTotalPages);
  const category = searchParams.get("category");
  const price = searchParams.get("price");
  const search = searchParams.get("search");
  const [modalProduct, setModalProduct] = useState([]);
  const [activeSize, setActiveSize] = useState();
  const { isLoggedIn } = useAuth();
  const loading = useSelector(selectIsLoading);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    // Параметры поиска
    const params = {
      page: pageNum,
      category: category || "",
      price: price || "",
      search: search || "",
    };

    dispatch(getProducts(params));

    // Обновляем состояние после проверки параметров
    setSearchParams(searchParams);
    setShouldScroll(true);
  }, [
    pageNum,
    searchParams,
    dispatch,
    setSearchParams,
    category,
    search,
    price,
  ]);

  useEffect(() => {
    if (!loading && shouldScroll) {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition) {
        window.scrollTo(0, Number(scrollPosition));
        localStorage.setItem("scrollPosition", 0); // Обнуляем значение после использования
      }
      setShouldScroll(false); // Сброс флага
    }
  }, [loading, shouldScroll]); // Зависимости

  const handlePagination = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };


  const handleFilterChange = (type, value) => {
    searchParams.set(type, value);
    searchParams.set('page', 1);  // Сбрасываем номер страницы
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  const handlePriceFilter = (e) => {
    const { value } = e.target;
    handleFilterChange('price', value === "none" ? '' : value);
  };

  const resetFilters = () => {
    searchParams.delete('price');
    searchParams.delete('category');
    searchParams.delete('search');
    searchParams.set('page', 1);
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  const handleItemWithSize = (data) => {
    setActiveSize(data.modifications[0].modificator_name);
    setModalProduct(data);
    openModalSize();
  };

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
    closeModalSize();
  };

  return (
    <>
      <>
      <Element name="scroll">
        <Search setSearchParams={setSearchParams} searchParams={searchParams} />
      </Element>
      <CategoryWrapper>
        {categories.map((item) => {
          return (
            <CategoryItem
              onClick={() => handleFilterChange('category', item)}
              $active={item === category}
              key={item}
            >
              {item}
            </CategoryItem>
          );
        })}
        <CategoryItem $accent onClick={resetFilters}>
          Скинути фільтри
          <FaPlusCircle style={{ rotate: "45deg", fontSize: "14px" }} />
        </CategoryItem>
      </CategoryWrapper>
      <StyledSelect
        value={!price ? "none" : price}
        onChange={handlePriceFilter}
      >
        <option value="none">Сортувати</option>
        <option value="low">По-зростанню</option>
        <option value="high">По-зменьшенню</option>
      </StyledSelect>
      {product.length < 1 && (
        <ErrorMessage message="Нажаль, по-вашому запиту нічого не знайшлось..." />
      )}
      <ListWrapper>
        <List>
          <ProductsItem
            isLoggedIn={isLoggedIn}
            openModalLogin={openModalLogin}
            key={nanoid()}
            data={product}
            handleItemWithSize={handleItemWithSize}
          />
        </List>
      </ListWrapper>
      <Pagination
        handlePagePrev={handlePagination}
        totalPages={totalPages}
        currentPage={pageNum}
      />
      {isModalOpenSize && (
        <Modal onCloseModal={closeModalSize}>
          <ModalWrapper>
            <p>Оберіть розмір</p>
            <AddButtonWithSize
              activeSize={activeSize}
              modifications={modalProduct.modifications}
              setActiveSize={setActiveSize}
            />
            <ButtonWrapper>
              <Button
                onClick={() =>
                  handleClick({
                    product_id: modalProduct.product_id,
                    product_name: modalProduct.product_name,
                    description: modalProduct.description,
                    photo: modalProduct.photo,
                    price: modalProduct.price,
                    amount: modalProduct.amount,
                    category_name: modalProduct.category_name,
                    size: activeSize,
                  })
                }
              >
                Додати у кошик
              </Button>
            </ButtonWrapper>
          </ModalWrapper>
        </Modal>
      )}
      {isModalOpenLogin && !isLoggedIn && (
        <Modal onCloseModal={closeModalLogin}>
          <FormWrapper>
            <StyledModal>
              <CloseWrapper>
                <SlClose onClick={closeModalLogin} />
              </CloseWrapper>
              <LoginForm />
            </StyledModal>
          </FormWrapper>
        </Modal>
      )}
    </>
    </>
  );
};

export default ProductsList;
