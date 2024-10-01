import { memo } from "react";
import { LinksWrapper } from "./Header.styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogin } from "../../redux/auth/auth-selectors";
import styled from "styled-components";


const LinkStyled = styled(Link)`
  width: 100%;
  white-space: nowrap;
`;
const HeaderLinks = memo(() => {
  const isLoggedIn = useSelector(selectIsLogin);

  return (
    <LinksWrapper>
      <LinkStyled to="/">Каталог</LinkStyled>
      <LinkStyled to="/info">Доставка</LinkStyled>
      <LinkStyled>Про нас</LinkStyled>
      {!isLoggedIn && (
        <>
          <LinkStyled to="/register">Реєстрація</LinkStyled>
          <LinkStyled to="/login">Вхід</LinkStyled>
        </>
      )}
    </LinksWrapper>
  );
});

export default HeaderLinks;
