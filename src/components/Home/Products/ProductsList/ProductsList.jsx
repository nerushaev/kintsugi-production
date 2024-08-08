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
import styled from "styled-components";
import { scroller } from "react-scroll";
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
import { useLocation } from "react-router";
import Loader from "../../../Loader/Loader";

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
  const location = useLocation();

  useEffect(() => {
    // Параметры поиска
    const params = {
      page: pageNum,
      category: category || "",
      price: price || "",
      search: search || "",
    };

    dispatch(getProducts(params));

    setShouldScroll(true);

    setSearchParams(searchParams);
  }, [
    pageNum,
    searchParams,
    dispatch,
    setSearchParams,
    category,
    search,
    price,
    location.search,
    product.length
  ]);

  useEffect(() => {
    if (!loading && shouldScroll) {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (Number(scrollPosition) !== 0) {
        console.log(scrollPosition);
        window.scrollTo(0, Number(scrollPosition));
        localStorage.setItem("scrollPosition", 0);
      }
      setShouldScroll(false);
    }
  }, [loading, shouldScroll]);

  const handlePagination = (page) => {
    searchParams.set("page", page);
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
    {loading && <Loader />}
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
  );
};

export default ProductsList;
