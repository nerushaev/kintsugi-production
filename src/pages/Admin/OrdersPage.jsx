import React, { useEffect } from 'react'
import OrdersList from '../../components/Admin/OrdersList'
import { getOrders } from '../../redux/orders/order-operations';
import {useDispatch, useSelector} from 'react-redux';
import { selectAllOrders } from '../../redux/orders/order-selectors';



export default function OrdersPage() {
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <OrdersList orders={orders}></OrdersList>
  )
}
