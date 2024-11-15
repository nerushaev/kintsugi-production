import React from 'react';
import { MdHome } from "react-icons/md";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Span = styled.span`
  margin: 0 10px;
`;


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

const BreadScrumbsNav = ({ product_name, category, category_name }) => {

  const navigate = useNavigate(); 
  
  const handleNavigate = () => {
    if(!product_name) {
      return;
    }
    const previousUrl = localStorage.getItem("previousUrl")
    console.log(previousUrl)
    navigate(`${previousUrl}`);
  }

  return (
    <nav style={{display: "flex", alignItems: "center", marginBottom: "30px"}} className="breadcrumbs">
      <a href='/'>
        <MdHome style={{fontSize: "24px", color: "gray"}} />
      </a>
      {(category || category_name) && <Span>/</Span>}
      {category && <span style={{cursor: "pointer"}} onClick={handleNavigate}>{categories[category]}</span>}
      {category_name && <span style={{cursor: "pointer"}} onClick={handleNavigate}>{category_name}</span>}
      {product_name && <Span>/</Span>}
      {product_name && <span>{product_name}</span>}
    </nav>
  );
};

export default BreadScrumbsNav;
