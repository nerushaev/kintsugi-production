import React, { useMemo } from 'react'
import styled from'styled-components';

const LiqpayWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export default function LiqpayButton({data, signature}) {
  const dataMemo = useMemo(() => {
    return data;
  }, [data])
  const signatureMemo = useMemo(() => {
    return signature;
  }, [signature])
  return (
    <LiqpayWrapper>
            <form
              method="POST"
              action="https://www.liqpay.ua/api/3/checkout"
              acceptCharset="utf-8"
            >
              <input type="hidden" name="data" value={dataMemo} />
              <input type="hidden" name="signature" value={signatureMemo} />
              <input
                alt=""
                type="image"
                src="//static.liqpay.ua/buttons/p1ru.radius.png"
              />
            </form>
          </LiqpayWrapper>
  )
}
