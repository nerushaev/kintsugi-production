import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { Select } from "../../../Busket/CheckoutPage/SelectInput";
import { FaPlusCircle } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import { scroller } from 'react-scroll';

const categories = [
  "Косплей",
  "Перуки",
  "Аксесуари",
  "Мерч",
  "Lolita fashion",
  "Катани, мечі, зброя",
  "K-pop",
  "Фігурки",
  "Акрилові стенди",
];

const CategoryWrapper = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
`;
const CategoryItem = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$active ? `${theme.colors.formButtonAccent}` : `${theme.colors.formButton}`};
  color: ${(props) => (props.$accent ? `${theme.colors.redAccent}` : "none")};
  cursor: pointer;
  font-size: ${theme.fontSizes.small};
  &:hover {
    background-color: ${theme.colors.formButtonAccent};
  }
`;

const StyledSelectWrapper = styled.div`
  padding: 0 10px;
`;

const StyledSelect = styled(Select)`
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: white;
  color: gray;
`;

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const price = searchParams.get("price");

  const handleFilterChange = (type, value) => {
    searchParams.set(type, value);
    searchParams.set('page', 1);  // Сбрасываем номер страницы
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  const handlePriceFilter = (e) => {
    const { value } = e.target;
    handleFilterChange('price', value === "none" ? '' : value);
  };

  const resetFilters = () => {
    searchParams.delete('price');
    searchParams.delete('category');
    searchParams.delete('search');
    searchParams.set('page', 1);
    setSearchParams(searchParams);

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  return (
    <>
    <CategoryWrapper>
      {categories.map((item) => {
        return (
          <CategoryItem
            onClick={() => handleFilterChange('category', item)}
            $active={item === category}
            key={item}
          >
            {item}
          </CategoryItem>
        );
      })}
      <CategoryItem $accent onClick={resetFilters}>
        Скинути фільтри
        <FaPlusCircle style={{ rotate: "45deg", fontSize: "14px" }} />
      </CategoryItem>
    </CategoryWrapper>
    <StyledSelectWrapper>
    <StyledSelect
      value={!price ? "none" : price}
      onChange={handlePriceFilter}
    >
      <option value="none">Сортувати</option>
      <option value="low">По-зростанню</option>
      <option value="high">По-зменьшенню</option>
    </StyledSelect>
    </StyledSelectWrapper>
    </>
  )
}
