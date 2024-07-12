import FormAddProducts from "../../components/Admin/Form";
import { getStateProducts, getTotalPages } from "../../redux/products/products-selectors";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllProductsName, getProducts } from "../../redux/products/products-operation";
import { useDispatch } from "react-redux";
import Search from "../../components/Home/Search/Search";
import Modal from '../../components/Modal';
import useModal from '../../hooks/modal';
import { Button, ButtonWrapper } from "../../components/Buttons/Buttons";
import ProductsList from "../../components/Admin/Products/ProductsList";
import Pagination from "../../components/Home/Pagination/Pagination";
import { getSearch } from "../../redux/search/search-selectors";

export default function Admin() {
  const products = useSelector(getStateProducts);
  const dispatch = useDispatch(); 
  const [page, setPage] = useState(1);
  const totalPages = useSelector(getTotalPages);
  const search = useSelector(getSearch);

  const {closeModal, isModalOpen, openModal} = useModal();
  
  useEffect(() => {
    dispatch(getAllProductsName());
  }, [dispatch]);


  const handlePagination = (e) => {
    e.preventDefault();
    const { textContent } = e.target;
    const page = parseInt(textContent);
    setPage(page);
  };

  return (
    <>
    {isModalOpen && 
    <Modal onCloseModal={closeModal}>
    <FormAddProducts closeModal={closeModal}/>
    </Modal>
    }
    
      {/* {loading && <Loader />} */}
      {/* <Search /> */}
      {/* {products && <ProductsList data={products} />} */}
      <Pagination 
      handlePagePrev={handlePagination}
      totalPages={totalPages}
      currentPage={page}
      />
      </>
  );
}
