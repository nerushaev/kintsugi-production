import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
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
import { Container } from "../components/Container/Container.styled";

export default function Product() {
  const dispatch = useDispatch();
  const product_id = useParams();
  const isLoading = useSelector(selectIsLoading);
  const products = useSelector(selectSimilarProducts);
  const product = useSelector(getDetails);

  const productCategory = useMemo(() => {
    return product.category;
  }, [product])

  useEffect(() => {
      dispatch(getProductsById(...Object.values(product_id)));
      if(productCategory) {
        dispatch(getSimilarProducts({category: productCategory}));
      }
  }, [dispatch, product_id, productCategory]);

  return (
      <Container>
      {(isLoading) && <Loader />}
      <>
      {(!isLoading && product.length !== 0) && 
        <ProductsDetails data={product} />
      }
      <MoreInfoControlls data={product} />
      <Title text="Схожі товари" />
      <List>
        <ProductsItem data={products} id={product._id} />
      </List>
      </>
      </Container>
  );
}
