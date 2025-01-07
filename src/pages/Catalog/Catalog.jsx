import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import Search from "../../components/Home/Search/Search";
import ProductsList from "../../components/Home/Products/ProductsList/ProductsList";
import Pagination from "../../components/Home/Pagination/Pagination";
import { useParams } from "react-router-dom";
import { Title, TitleWrapper } from "../../components/Text/Text.styled";
import useFilters from "../../hooks/useFilter";
import { Container } from "../../components/Container/Container.styled";
import BreadScrumbsNav from "../../components/BreadScrumbsNav/BreadScrumbsNav";
import { selectStateProducts } from "../../redux/products/products-selectors";

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
    <Search />
    <ProductsList products={products} />
    <Pagination />
    </div>
    </Container>
  )
});

export default Catalog;