import React from "react";
import styled from "styled-components";

const LoaderStyles = styled.span`
  width: 84px;
  height: 84px;
  position: fixed;
  left: 50%;
  top: 40vh;
  z-index: 99;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(162, 210, 255, 1);
    transform: scale(0);
    animation: push 2s infinite linear;
  }
  &:after {
    animation-delay: 1s;
  }
  @keyframes push {
    0%,
    50% {
      transform: translate(-50%, 0%) scale(1);
    }
    100% {
      transform: translate(-50%, -100%) scale(0);
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  overflow-y: scroll;
  top: 0;
  left: 0;
  z-index: 12;

  @media screen and (min-width: 1280px) {
    // align-items: center;
  }
`;

export default function Loader() {
  return (
    <Overlay>
      <LoaderStyles />
    </Overlay>
  );
}
