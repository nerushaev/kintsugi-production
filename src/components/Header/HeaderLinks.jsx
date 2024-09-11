import { memo } from "react";
import { LinksWrapper } from "./Header.styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../../redux/auth/auth-selectors";

const HeaderLinks = memo(() => {
  const isLoggedIn = useSelector(selectIsLogin);

  return (
    <LinksWrapper>
      <Link to="/">Каталог</Link>
      <Link to="/info">Оплата та доставка</Link>
      <Link>Про нас</Link>
      {!isLoggedIn && (
        <>
          <Link to="/register">Реєстрація</Link>
          <Link to="/login">Вхід</Link>
        </>
      )}
    </LinksWrapper>
  );
});

export default HeaderLinks;
