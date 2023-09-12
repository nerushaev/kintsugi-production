import React from "react";
import styled from "styled-components";

export const LoaderContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Loader = styled.span`
  width: 28px;
  height: 28px;
  border: 3px dotted #000;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
`;

export const SmallLoader = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};
