import { memo, useState } from "react";
import { useSelector } from "react-redux";
import SizeButtons from "../SizeButtons/SizeButtons";
import ProductButtons from "../../../Buttons/ProductButton";
import { selectAvailableSize } from "../../../../redux/products/products-selectors";

const ProductsDetailsController = memo(({ data }) => {
  const modifications = useSelector(selectAvailableSize);
  const [activeSize, setActiveSize] = useState(
    modifications[0]?.modificator_name || null
  );

  return (
    <>
      {modifications?.length > 0 && (
        <SizeButtons
          details={true}
          modifications={modifications}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
        />
      )}
      <ProductButtons product={data} activeSize={activeSize} />
    </>
  );
});

export default ProductsDetailsController;
