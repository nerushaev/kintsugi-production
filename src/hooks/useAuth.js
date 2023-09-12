import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsLogin,
  selectIsLoading,
  selectError,
  selectToken,
  selectRole,
} from "../redux/auth/auth-selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLogin);
  const isRefreshing = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    error,
    token,
    role,
  };
};
