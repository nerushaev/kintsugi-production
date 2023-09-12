import React from "react";
import styled from "styled-components";

const Block = styled.div`
  padding: 0 10px;
  margin: 0 auto;

  @media screen and (min-width: 320px) {
    max-width: 479px;
  }

  @media screen and (min-width: 768px) {
    max-width: 1199px;
    padding: 0 20px;
  }

  @media screen and (min-width: 1280px) {
    width: 1280px;
    padding: 0 30px;
  }
`;

export default function Container({ children }) {
  return <Block>{children}</Block>;
}
