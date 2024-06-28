import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { getProductsById, getSimilarProducts } from "../redux/products/products-operation";
import ProductsDetails from "../components/Home/Products/ProductsDetails/ProductsDetails";
import {
  getDetails,
  selectIsLoading,
  selectSimilarProducts,
} from "../redux/products/products-selectors";
import Loader from "../components/Loader/Loader";
import { List } from "../components/Home/Products/List.styled";
import { ProductsItem } from "../components/Home/Products/ProductsItem/ProductsItem";
import MoreInfoControlls from "../components/Home/Products/ProductsDetails/MoreInfoControlls/MoreInfoControlls";
import Title from "../components/Home/Title/Title";

export default function Product() {
  const dispatch = useDispatch();
  const product_id = useParams();
  const isLoading = useSelector(selectIsLoading);
  const products = useSelector(selectSimilarProducts);
  const product = useSelector(getDetails);

  // useEffect(() => {
  //     dispatch(getProductsById(...Object.values(product_id)));
  //     if(productCategory) {
  //       dispatch(getSimilarProducts({category: productCategory}));
  //     }
  // }, [dispatch, product_id, productCategory]);

  return (
      <>
      {/* {(isLoading) && <Loader />} */}
      <>
      {(!isLoading && product.length !== 0) && 
        <ProductsDetails data={product} />
      }
      <MoreInfoControlls/>
      <Outlet/>
      </>
      </>
  );
}
