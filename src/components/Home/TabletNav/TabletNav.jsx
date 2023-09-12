import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../hooks/useAuth";
import { theme } from "../../../styles/theme";
import Logo from "../Logo/Logo";

const Header = styled.header`
  padding: 20px 0;
  margin-bottom: 50px;
  border-bottom: 2px solid rgba(255, 200, 221, 1);
  @media (min-width: 769px) {
    padding: 20px 0;
  }
`;

const TabletNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: ${theme.fontSizes.medium};
  text-align: center;
`;

const NavigationList = styled.ul`
  display: flex;
`;

const NavigationItem = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
  // @media (min-width: 768px) {
  //   &:not(:last-child) {
  //     margin-right: 50px;
  //   }
  // }
`;

const StyledLink = styled(Link)``;

// const UserName = styled.p`
//   font-size: ${theme.fontSizes.small};
//   font-weight: 400;
// `;

export default function TabletNav() {
  const { isLoggedIn, user } = useAuth();
  // let isDesktop = window.screen.width > "1199" && !isLoggedIn ? true : false;
  return (
    <Header>
      <TabletNavigation>
        <Logo className={"nav-logo"} />
        <NavigationList>
          <NavigationItem>
            <StyledLink to="/">Головна</StyledLink>
          </NavigationItem>
          <NavigationItem>
            <Link to="/info">Інформація</Link>
          </NavigationItem>
          {!isLoggedIn ? (
            <>
              <NavigationItem>
                <Link to="/register">Реєстрація</Link>
              </NavigationItem>
              <NavigationItem>
                <Link to="/login">Вхід</Link>
              </NavigationItem>
            </>
          ) : (
            <NavigationItem>
              <Link to="/user">Кабінет</Link>
            </NavigationItem>
          )}
          <NavigationItem>
              <Link to="/busket">Кошик</Link>
            </NavigationItem>
            {user.role === "admin" && 
          <NavigationItem>
          <Link to="/admin">Адмінка</Link>
        </NavigationItem>
        }
        </NavigationList>
        {/* {isLoggedIn && (
          <div>
            <UserName>{user.email}</UserName>
          </div>
        )} */}
      </TabletNavigation>
    </Header>
  );
}
