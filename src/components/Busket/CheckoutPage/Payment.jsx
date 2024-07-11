import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLiqpay } from '../../../redux/products/products-selectors';
import { clearBusket } from '../../../redux/products/products-slice';
import LiqpayButton from './LiqpayButton';

export default function Payment() {
  const {data, signature} = useSelector(getLiqpay);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearBusket());
  }
  
  return (
    <LiqpayButton onClick={handleClick} data={data} signature={signature}/>
  )
}
