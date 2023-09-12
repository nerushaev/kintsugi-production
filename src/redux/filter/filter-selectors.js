// export const getFilter = ({ filter }) => {
//   const result = [];

//   for (const element in filter) {
//     if (filter[element] === true) {
//       result.push(element);
//     }
//   }

//   if (result.length < 1) {
//     return
//   }

//   return result;
// };


export const getFilter = state => state.filter;