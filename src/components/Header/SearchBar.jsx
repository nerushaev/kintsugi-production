import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'debounce';
import styled from 'styled-components';
import { getSearchProducts } from '../../redux/products/products-operation';
import { selectSearchProducts } from '../../redux/products/products-selectors';
import { theme } from '../../styles/theme';
import { IoIosSearch, IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import { clearSearchItems } from '../../redux/products/products-slice';

const SearchContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: white;
  margin-top: 58px;
  width: 100%;
  padding: 10px;
  padding-bottom: 20px;
  text-align: center;
  @media (min-width: 767px) {
    width: 300px;
    right: 0;
    margin-top: 68px;
    border-bottom-left-radius: 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: 40px;
  font-weight: 500;
  border-width: 1px;
  border-radius: 6px;
  border-color: ${theme.colors.darkBlue};
  &::placeholder {
    opacity: 0.6;
  }
`;

const List = styled.ul`
  width: 100%;
  background-color: white;
  margin: 0 auto;
  padding-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 6px;
  padding-right: 20px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.ligthGray};
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const ProductName = styled.p`
  font-family: 'Montserrat Alternates';
  font-size: ${theme.fontSizes.small};
`;

// const categories = {
//   cosplay: 'Косплей',
//   wigs: 'Перуки',
//   accessories: 'Аксесуари',
//   merch: 'Мерч',
//   'lolita-fashion': 'Lolita fashion',
//   'katanas-swords-weapons': 'Катани, мечі, зброя',
//   'k-pop': 'K-pop',
//   figures: 'Фігурки',
//   'acrylic-stands': 'Акрилові стенди',
//   'backpacks-bags': 'Рюкзаки, сумки',
//   lenses: 'Лінзи',
// };



export default function SearchBar({ setSearchActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Добавлено состояние загрузки
  const products = useSelector(selectSearchProducts);
  const inputRef = useRef(null);
  const screenSize = useScreenSize();

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        setIsLoading(true);
        await dispatch(getSearchProducts(value));
        setIsLoading(false);
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (searchValue.trim().length > 2) {
      debouncedSearch(searchValue);
    } else {
      dispatch(clearSearchItems()); // Очистить результаты, если ввод менее 3 символов
    }

    return () => {
      debouncedSearch.clear();
    };
  }, [searchValue, debouncedSearch, dispatch]);

  useEffect(() => {
    if (screenSize.width < 767) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [screenSize.width]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = ({ product_id, category_name }) => {
    navigate(`/${category_name}/${product_id}`);
    setSearchActive(false);
  };

  return (
    <SearchContainer>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <IoIosSearch style={{ fontSize: '28px', position: 'absolute', left: '10px' }} />
        <Input
          ref={inputRef}
          name="search"
          placeholder="Пошук..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Search products"
        />
        <IoIosCloseCircleOutline
          onClick={() => setSearchActive(false)}
          style={{ fontSize: '30px', marginLeft: '10px', cursor: 'pointer' }}
          aria-label="Close search"
        />
      </div>
      <List>
        {isLoading ? (
          <p>Завантаження...</p>
        ) : searchValue.trim().length > 2 && products.length > 0 ? (
          products.map((item) => (
            <Item
              key={item.product_id}
              onClick={() => handleClick({ product_id: item.product_id, category_name: item.category_name })}
            >
              <Image
                src={
                  item.photo
                    ? `https://kintsugi.joinposter.com${item.photo}`
                    : 'https://res.cloudinary.com/dzjmswzgp/image/upload/v1719250641/image_not_found_wruanw.jpg'
                }
                alt={item.product_name}
              />
              <ProductName>{item.product_name}</ProductName>
            </Item>
          ))
        ) : (
          <p>Результати не знайдено</p>
        )}
      </List>
    </SearchContainer>
  );
}