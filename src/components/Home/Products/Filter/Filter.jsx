import React from 'react';
import { FaPlusCircle } from "react-icons/fa";
import useFilters from '../../../../hooks/useFilter';
import { CategoryItem, CategoryWrapper, StyledSelect, StyledSelectWrapper } from './Filter.styled';

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
  "Рюкзаки, сумки",
  "Лінзи"
];

export default function Filter() {
  const { category, price, handleFilterChange, resetFilters } = useFilters(); // Используем хук

  const handlePriceFilter = (e) => {
    const { value } = e.target;
    handleFilterChange('price', value === 'none' ? '' : value);
  };

  return (
    <>
      <CategoryWrapper>
        {categories.map((item) => (
          <CategoryItem
            onClick={() => handleFilterChange('category', item)}
            $active={item === category}
            key={item}
          >
            {item}
          </CategoryItem>
        ))}
        <CategoryItem $accent onClick={resetFilters}>
          Скинути фільтри
          <FaPlusCircle style={{ rotate: '45deg', fontSize: '14px' }} />
        </CategoryItem>
      </CategoryWrapper>
      <StyledSelectWrapper>
        <StyledSelect value={!price ? 'none' : price} onChange={handlePriceFilter}>
          <option value="none">Сортувати</option>
          <option value="low">По-зростанню</option>
          <option value="high">По-зменьшенню</option>
        </StyledSelect>
      </StyledSelectWrapper>
    </>
  );
}
