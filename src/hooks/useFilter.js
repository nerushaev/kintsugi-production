import { useParams, useSearchParams } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../redux/products/products-operation';

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

const useFilters = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {category} = useParams();
  const price = searchParams.get('price');
  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const matchedCategory = categories[category];

  const handleFilterChange = (type, value) => {

    if(type === "category") {
      return;
    }
    
    searchParams.set(type, value);
    searchParams.set('page', 1);  // Сбрасываем страницу
    setSearchParams(searchParams);

    scroller.scrollTo('scroll', {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  const resetFilters = () => {
    searchParams.delete('price');
    searchParams.delete('search');
    searchParams.set('page', 1);
    setSearchParams(searchParams);

    scroller.scrollTo('scroll', {
      smooth: true,
      duration: 500,
      delay: 0,
    });
  };

  useEffect(() => {
    const params = {
      page: page || 1,
      category: matchedCategory || '',
      price: price || '',
      search: search || '',
    };

    dispatch(getProducts(params));
  }, [page, matchedCategory, price, search, dispatch]);

  return { category, price, handleFilterChange, resetFilters };
};

export default useFilters;
