import { useSelector } from "react-redux";
import { getBusket } from "../../redux/products/products-selectors";
import { nanoid } from "nanoid";
import { BusketList } from "../Busket/BusketList.styled";
import React, { useEffect, useState } from "react";
import BusketItem from "./BusketItem";
import Subtitle from "../Home/Subtitle/Subtitle";

export default function Busket() {
  const products = useSelector(getBusket);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let sum = 0;
    products.map((item) => {
      return sum += (item.price * item.amount);
    });
    setTotalCost(sum);
  }, [products])


  const itemId = nanoid();

  return (
    <>
    <BusketList key={itemId}>
      <BusketItem data={products} />
    </BusketList>
      <Subtitle>Загальна сума замовлення:</Subtitle>
      <Subtitle accent={true}>{totalCost}грн</Subtitle>
    </>
  );
}
