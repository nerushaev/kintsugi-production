import FormAddProducts from "../../components/Admin/Form";
import { getStateProducts } from "../../redux/products/products-selectors";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllProducts } from "../../redux/products/products-operation";
import { useDispatch } from "react-redux";
import ProductsList from "../../components/Admin/Products/ProductsList";
import Search from "../../components/Home/Search/Search";

export default function Admin() {
  const products = useSelector(getStateProducts);
  const dispatch = useDispatch(); 

  useEffect(() => {
      dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <FormAddProducts />
      {/* {loading && <Loader />} */}
      {products.length > 2 &&<Search />}
      {products && <ProductsList data={products} />}
    </>
  );
}
