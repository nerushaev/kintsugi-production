import { memo } from "react";
import { useSelector } from "react-redux";
import { selectStateProducts } from "../../../redux/products/products-selectors";
import Search from "../Search/Search";
import Filter from "../Products/Filter/Filter";
import ProductsList from "../Products/ProductsList/ProductsList";
import Pagination from "../Pagination/Pagination";


const Catalog = memo(() => {
  const products = useSelector(selectStateProducts);

  return(
    <>
    <Search />
    <Filter />
    <ProductsList products={products} />
    <Pagination />
    </>
  )
});

export default Catalog;