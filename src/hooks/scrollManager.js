// src/components/ScrollManager.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollManager = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Слушаем изменения в location, но так как `history.listen` больше нет, 
    // мы будем просто использовать навигацию и изменения pathname
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Сохраняем текущую позицию прокрутки перед переходом
    // Замена history.replace на navigate с параметрами state и replace
    const saveScrollPosition = () => {
      navigate(location.pathname + location.search, {
        replace: true,
        state: { scrollPosition: window.scrollY },
      });
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location, navigate]);

  useEffect(() => {
    // Восстанавливаем позицию прокрутки при монтировании
    const state = location.state;
    if (state && state.scrollPosition !== undefined) {
      window.scrollTo(0, state.scrollPosition);
    }
  }, [location]);

  return children;
};

export default ScrollManager;
