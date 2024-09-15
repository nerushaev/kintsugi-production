import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectWishes } from '../../../../redux/auth/auth-selectors'
import { getWishProducts } from '../../../../redux/products/products-operation';
import { getWishList } from '../../../../redux/products/products-selectors';
import ErrorMessage from '../../../Errors/ErrorMessage';
import ProductsList from '../../../Home/Products/ProductsList/ProductsList';

export default function WishList() {
  const wishes = useSelector(selectWishes);
  const products = useSelector(getWishList);
  const dispatch = useDispatch();

  useEffect(() => {
    if(wishes?.length === 0) {
      return;
    }
    dispatch(getWishProducts(wishes))
  }, [wishes, dispatch]);

  return (
    <>
    {(products?.length === 0 || wishes?.length === 0) ? <ErrorMessage message="Додайте товари в список бажань!"/>
    :
    <ProductsList products={products} />
  }
  </>
  )
}
