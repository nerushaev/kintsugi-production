import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { Outlet } from 'react-router';

const Wrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin-right: 15px;
`;

export default function AdminNav() {
  return (
    <div>
      <Wrapper>
      <StyledLink to="products">Товар</StyledLink>
      <StyledLink to="banners">Банери</StyledLink>
      <StyledLink to="orders">Замовлення</StyledLink>
      </Wrapper>
      <Outlet />
    </div>
  )
}
