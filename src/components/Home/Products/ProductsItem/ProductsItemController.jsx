import { memo, useState } from "react";
import ProductButtons from "../../../Buttons/ProductButton";


const ProductsItemController = memo(({product}) => {
  const [activeSize, setActiveSize] = useState(null);

  return(
    <>
    <ProductButtons setActiveSize={setActiveSize} product={product} activeSize={activeSize}/>
    </>
  )
})

export default ProductsItemController;