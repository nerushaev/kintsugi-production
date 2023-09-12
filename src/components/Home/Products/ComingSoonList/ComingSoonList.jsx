import { ListWrapper, List } from '../List.styled';
import { ProductsItem } from '../ProductsItem/ProductsItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getComingSoonProducts } from '../../../../redux/products/products-operation';
import { selectСomingSoonProducts } from '../../../../redux/products/products-selectors';

export default function ComingSoonList() {
  const dispatch = useDispatch();
  const products = useSelector(selectСomingSoonProducts);

  useEffect(() => {
    dispatch(getComingSoonProducts());
  }, [dispatch])

  return (
    <ListWrapper>
      <List>
        <ProductsItem data={products} />
      </List>
    </ListWrapper>
  )
}
