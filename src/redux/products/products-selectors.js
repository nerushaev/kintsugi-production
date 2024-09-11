import { createSelector } from "@reduxjs/toolkit";
import { getFilter } from "../filter/filter-selectors";

const selectProductsState = (state) => state.products;

export const selectStateProducts = (state) => state.products.items;

export const getWishList = ({products}) => products.wishList;

export const getDetails = (state) => state.products.details;

export const selectSimilarProducts = (state) => state.products.similarProducts;

export const selectMonoPayUrl = (state) => state.products.monoPayUrl;

export const selectСomingSoonProducts = (state) =>
  state.products.comingSoonProducts;

export const selectIsLoading = (state) => state.products.isLoading;

export const selectError = (state) => state.products.error;

export const getCurrentPage = (state) => state.products.currentPage;

export const getTotalPages = (state) => state.products.totalPages;

export const getBusket = (state) => state.products.busket;

export const getLiqpay = (state) => state.products.liqpay;

export const selectOrderId = (state) => state.products.orderId;

export const selectBusketItemAmount = ({products}, product_id) => {
  if(products.busket === 0) {
    return;
  }
  const product = products.busket.filter(item => item.product_id === product_id);
  return product[0];
}

export const totalBusketPrice = ({products}) => {
  const {busket} = products;

  let sum = 0;
  busket.map((item) => {
    return sum += ((item.price / 100) * item.amount);
  });
  return sum;
}

export const selectBusketAmount = ({ products }) => {
  const busket = products.busket;

  let amount = 0;

  for (let item of busket) {
    amount = amount + item.amount;
  }
  return amount;
};
export const selectBusketProductsId = (state) => {
  const busket = getBusket(state);
  const result = busket.reduce((acc, cur) => {
    const { name, amount, _id } = cur;
    const productsData = {
      name,
      _id,
      amount,
    };
    return [...acc, productsData];
  }, []);
  return result;
};

export const selectAvailableSize = createSelector(
  [selectProductsState],
  (products) => {
    const availableSize = products.details.modifications.filter(item => item.size_left > 0);
    return availableSize;
  }
  
)

export const selectFilteredProducts = (state) => {
  const filter = getFilter(state);
  const products = selectStateProducts(state);

  // if (!filter) {
  //   const filteredProducts = products.filter((element) => {
  //     const filtered = element.hasOwnProperty('comingSoon');
  //     const result = !filtered;
  //     return result;
  //   })
  //   return filteredProducts;
  // }

  if (!filter) {
    return products;
  }

  // const filteredProducts = products.filter(({ category }) => {
  //   const result = category.includes(filter);
  //   return result;
  // });

  return products;
};

export const selectIsOrderAccepted = ({products}) => products.orderAccepted;

