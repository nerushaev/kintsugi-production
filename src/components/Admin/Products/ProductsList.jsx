import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import { getStateProducts, selectIsLoading } from '../../../redux/products/products-selectors';
import ProductsItem from './ProductsItem';
import Loader from '../../Loader/Loader'

export default function ProductsList() {
  const products = useSelector(getStateProducts);
  const isLoading = useSelector(selectIsLoading);
  console.log(products);
  // const search = useSelector(getSearch);

  // const result = products.filter(item => {
  //   return item.name.toLowerCase().includes(search);

  // })

      return (
        <>
        {isLoading ? <Loader />
          : 
          <>
          {products.map(item => {
              return <ProductsItem key={nanoid()} data={item} />
          })}
          </>
        }
        </>
      )
};
