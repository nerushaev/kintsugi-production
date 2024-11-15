import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStateProducts } from "../../../redux/products/products-selectors";
import Search from "../Search/Search";
import ProductsList from "../Products/ProductsList/ProductsList";
import Pagination from "../Pagination/Pagination";
import { useParams } from "react-router-dom";
import { Title, TitleWrapper } from "../../Text/Text.styled";
import useFilters from "../../../hooks/useFilter";
import { Container } from "../../Container/Container.styled";
import BreadScrumbsNav from "../../BreadScrumbsNav/BreadScrumbsNav";

const categories = {
  "cosplay": "Косплей",
  "wigs": "Перуки",
  "accessories": "Аксесуари",
  "merch": "Мерч",
  "lolita-fashion": "Lolita fashion",
  "katanas-swords-weapons": "Катани, мечі, зброя",
  "k-pop": "K-pop",
  "figures": "Фігурки",
  "acrylic-stands": "Акрилові стенди",
  "backpacks-bags": "Рюкзаки, сумки",
  "lenses": "Лінзи"
};

  // "Косплей",
  // "Перуки",
  // "Аксесуари",
  // "Мерч",
  // "Lolita fashion",
  // "Катани, мечі, зброя",
  // "K-pop",
  // "Фігурки",
  // "Акрилові стенди",
  // "Рюкзаки, сумки",
  // "Лінзи"

const Catalog = memo(() => {
  const { handleFilterChange } = useFilters();
  const products = useSelector(selectStateProducts);
  const {category} = useParams();
  const matchedCategory = categories[category];

  useEffect(() => {
    handleFilterChange("category", matchedCategory);
  }, [category, handleFilterChange, matchedCategory]);


  return(
    <Container>
      <BreadScrumbsNav category={category}/>
    <div style={{marginBottom: "50px", marginTop: "30px"}}>
      <TitleWrapper>
      <Title>{matchedCategory}</Title>
      </TitleWrapper>
      
    {/* <Filter /> */}
    <Search />
    <ProductsList products={products} />
    <Pagination />
    </div>
    </Container>
  )
});

export default Catalog;