import React from 'react'
import { Button } from './Buttons'
import styled from 'styled-components';

const Loader = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #FFF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-right: 10px;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;

export default function ButtonWithLoader({loading, text, onClick}) {
  return (
    <Button onClick={onClick}>
      {loading && <Loader />}
      {text}
    </Button>
  )
}
