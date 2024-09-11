import { useSelector } from "react-redux";
import {
  selectUser,
  selectIsLogin,
  selectIsUserLoading,
  selectToken,
  selectRole,
} from "../redux/auth/auth-selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLogin);
  const isRefreshing = useSelector(selectIsUserLoading);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    token,
    role,
  };
};
