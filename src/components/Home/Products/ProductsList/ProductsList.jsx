import { ProductsItem } from "../ProductsItem/ProductsItem";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import { List, ListWrapper } from "../List.styled";
import { nanoid } from "@reduxjs/toolkit";
import Loader from "../../../Loader/Loader";

const ProductsList = ({products}) => {
  const loading = useSelector(selectIsLoading);
  const [shouldScroll, setShouldScroll] = useState(true);

  useEffect(() => {
    if (!loading && shouldScroll) {
      const scrollPosition = Number(localStorage.getItem("scrollPosition"));
      if (scrollPosition !== 0) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
          localStorage.setItem("scrollPosition", 0);
        }, 100); // Можно отрегулировать задержку
      }
      setShouldScroll(false);
    }
  }, [loading, shouldScroll]);
  

  return (
    <>
    {loading && <Loader />}
    <ListWrapper>
      <List>
        {products.map(item => {
          return (
            <ProductsItem
        key={nanoid()}
        product={item}
      />
          )
        })}
    </List>
    </ListWrapper>
  </>
  );
};

export default ProductsList;
