import React from 'react';
import { FaPlusCircle } from "react-icons/fa";
import useFilters from '../../../../hooks/useFilter';
import { CategoryItem, CategoryWrapper } from './Filter.styled';

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
  const { category, handleFilterChange, resetFilters } = useFilters(); // Используем хук

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
    </>
  );
}
