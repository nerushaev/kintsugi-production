import React from "react";
import styled from "styled-components";

const Block = styled.div`
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
`;

export default function Container({ children }) {
  return <Block>{children}</Block>;
}
