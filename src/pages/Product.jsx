import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { getProductsById } from "../redux/products/products-operation";
import ProductsDetails from "../components/Home/Products/ProductsDetails/ProductsDetails";
import {
  getDetails,
  selectIsLoading,
} from "../redux/products/products-selectors";
import Loader from "../components/Loader/Loader";
import MoreInfoControlls from "../components/Home/Products/ProductsDetails/MoreInfoControlls/MoreInfoControlls";
import { Container } from "../components/Container/Container.styled";

export default function Product() {
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const product = useSelector(getDetails);

  useEffect(() => {
      dispatch(getProductsById(product_id));
  }, [dispatch, product_id]);

  return (
      <Container>
      {(isLoading) && <Loader />}
      {!isLoading && product && Object.keys(product).length > 0 && <ProductsDetails data={product} />}
      <MoreInfoControlls />
      <Outlet/>
      </Container>
  );
}
