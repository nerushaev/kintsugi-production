import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectMonoPayUrl } from '../../redux/products/products-selectors';
import { SmallLoader } from '../SmallLoader/SmallLoader';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  top: 0;
  right: 0;
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
  flex-direction: column;
  padding: 20px 20px;
`;

const Title = styled.h2`
  font-weight: 500;
`;

export default function RedirectPage() {
  const monoPayUrl = useSelector(selectMonoPayUrl);

  useEffect(() => {
    if (monoPayUrl && monoPayUrl.length !== 0) {
      console.log(monoPayUrl);
      window.location.replace(monoPayUrl);
    }
  }, [monoPayUrl])

  return (
    <Overlay>
      <Block>
        <SmallLoader />
        <Title>Вас буде переадресовано на сторінку оплати</Title>
      </Block>
    </Overlay>
  )
}
