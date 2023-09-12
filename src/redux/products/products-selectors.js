import { getFilter } from "../filter/filter-selectors";

export const getStateProducts = (state) => state.products.items;

export const getDetails = (state) => state.products.details;

export const selectSimilarProducts = (state) => state.products.similarProducts;

export const selectСomingSoonProducts = (state) =>
  state.products.comingSoonProducts;

export const selectIsLoading = (state) => state.products.isLoading;

export const selectError = (state) => state.products.error;

export const getCurrentPage = (state) => state.products.currentPage;

export const getTotalPages = (state) => state.products.totalPages;

export const getBusket = (state) => state.products.busket;

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

export const selectFilteredProducts = (state) => {
  const filter = getFilter(state);
  const products = getStateProducts(state);

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
