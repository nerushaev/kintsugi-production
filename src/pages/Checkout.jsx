import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import FirstStep from "../components/Busket/CheckoutPage/CheckoutSteps/FirstStep";
import SecondStep from "../components/Busket/CheckoutPage/CheckoutSteps/SecondStep";
import ThirdStep from "../components/Busket/CheckoutPage/CheckoutSteps/ThirdStep";
import { Container } from "../components/Container/Container.styled";
import { selectUser } from "../redux/auth/auth-selectors";
import { getBusket, selectIsLoading, selectMonoPayUrl } from "../redux/products/products-selectors";
import { theme } from "../styles/theme";

const StepsWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const StepItemWrapper = styled.div`
  position: relative;
  width: 33%;
  text-align: center;
  &${(props) => {
      const { $step1, $step2, $step3 } = props;
      if ($step1 && !$step2 && !$step3) {
        return `:first-child:after`;
      } else if (!$step1 && $step2 && !$step3) {
        return `:not(:last-child):after`;
      } else if (!$step1 && !$step2 && $step3) {
        return `:after`;
      }
    }} {
    content: "";
    position: absolute;
    top: 1rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: ${theme.colors.formButton};
    border-radius: 50%;
    z-index: 1;
  }
  &:not(:first-child):before {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: 0;
    left: -50%;
    top: 1.5rem;
    background: ${(props) => props.$active ? `${theme.colors.formButton}` : `${theme.colors.gray}`};
  }
`;

const StepDetails = styled.div`
  margin-top: 50px;
  margin-bottom: 0;
  margin-left: 5px;
  margin-right: 5px;
`;

const StepTitle = styled.div``;

export default function Checkout() {
  const user = useSelector(selectUser);
  const busket = useSelector(getBusket);
  const loading = useSelector(selectIsLoading);
  const monoPayUrl = useSelector(selectMonoPayUrl);
  const navigate = useNavigate();
  const {delivery} = user;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    orderComments: '',
    register: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (busket.length === 0 && monoPayUrl && !loading) {
      navigate("/redirect");
    } else if (busket.length === 0 && !monoPayUrl && !loading) {
      navigate("/");
    }
  }, [monoPayUrl, loading, navigate, busket])


  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  return (

    <Container  style={{ marginTop: "30px" }}>
      <StepsWrapper>
        <StepItemWrapper $active={step1} $step1={step1} $step2={step2} $step3={step3}>
          <StepDetails>
            <StepTitle>
              <span>Вхід</span>
            </StepTitle>
          </StepDetails>
        </StepItemWrapper>
        <StepItemWrapper $active={step2 || step3} $step1={step1} $step2={step2} $step3={step3}>
          <StepDetails>
            <StepTitle>
              <span>Деталі замовлення</span>
            </StepTitle>
          </StepDetails>
        </StepItemWrapper>
        <StepItemWrapper $active={step3} $step1={step1} $step2={step2} $step3={step3}>
          <StepDetails>
            <StepTitle>
              <span>Доставка та оплата</span>
            </StepTitle>
          </StepDetails>
        </StepItemWrapper>
      </StepsWrapper>
      {step1 && <FirstStep setStep1={setStep1} setStep2={setStep2} />}
      {step2 && <SecondStep user={user.email ? user : userData} setUserData={setUserData} setStep2={setStep2} setStep3={setStep3}/>}
      {step3 && <ThirdStep userData={userData} delivery={delivery} setStep2={setStep2} setStep3={setStep3}/>}
    </Container>
  );
}
