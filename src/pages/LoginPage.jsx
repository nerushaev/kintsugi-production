import React from "react";
import styled from "styled-components";
import HeaderAuth from "../components/Auth/HeaderAuth/HeaderAuth";
import Loader from "../components/Loader/Loader";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled.div`
  width: 280px;
  height: 100%;
  margin: 0 auto;
  padding: 100px 0;
`;

export default function LoginPage() {
  const { isRefreshing } = useAuth();

  return (
    <Wrapper>
      {isRefreshing && <Loader />}
      <HeaderAuth />
    </Wrapper>
  );
}
