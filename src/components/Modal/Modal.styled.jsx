import styled from 'styled-components';

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
