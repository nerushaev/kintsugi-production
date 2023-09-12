import { useSelector } from "react-redux";
import { getBusket } from "../../redux/products/products-selectors";
import { nanoid } from "nanoid";
import { List } from "../Home/Products/List.styled";
import { ProductsItem } from "../Home/Products/ProductsItem/ProductsItem";
import React from "react";

export default function BusketList() {
  const products = useSelector(getBusket);

  const itemId = nanoid();
  return (
    <List key={itemId}>
      <ProductsItem data={products} />
    </List>
  );
}
