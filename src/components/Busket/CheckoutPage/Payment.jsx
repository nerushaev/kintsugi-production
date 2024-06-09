import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AuthInstance, BASE_URL } from '../../../API/api';
import { getBusket, selectOrderId } from '../../../redux/products/products-selectors';
import LiqpayButton from './LiqpayButton';

export default function Payment() {
  const busket = useSelector(getBusket);
  const orderId = useSelector(selectOrderId);
  const [data, setData] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    const getSignature = async () => {
      try {
        const result = await AuthInstance.post(
          `${BASE_URL}api/orders/createSignature`,
          { products: busket,
            orderId
          }
        );
        console.log(result);
        if (result.data) {
          setData(result.data.data);
          setSignature(result.data.signature);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSignature();
  }, [busket, orderId])

  return (
    <LiqpayButton data={data} signature={signature}/>
  )
}
