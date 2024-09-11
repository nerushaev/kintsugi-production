import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '../redux/auth/auth-operations'; // асинхронная операция для получения текущего пользователя
import { selectIsLogin, selectIsUserLoading, selectToken } from '../redux/auth/auth-selectors'; // селекторы

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLogin);
  const isRefreshing = useSelector(selectIsUserLoading);

  useEffect(() => {
    if (isLoggedIn) return;

    if (token && !isLoggedIn) {
      dispatch(current());
    }
  }, [dispatch, token, isLoggedIn]);

  return { isLoggedIn, isRefreshing };
};

export default useAuthCheck;
