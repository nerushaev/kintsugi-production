import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import { getStateProducts } from '../../../redux/products/products-selectors';
import { getSearch } from '../../../redux/search/search-selectors';

import ProductsItem from './ProductsItem';


export default function ProductsList() {
  const products = useSelector(getStateProducts);
  const search = useSelector(getSearch);

  const result = products.filter(item => {
    return item.name.toLowerCase().includes(search);

  })

  return result.map((data) => {
      const keyId = nanoid();
      return <ProductsItem key={keyId} data={data} />
    })
};
