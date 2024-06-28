import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../../../styles/theme";
import novaLogo from '../../../../../assets/nova-poshta-logo.jpg';
import afinaLogo from '../../../../../assets/afina-image.jpg';
import liqpayLogo from '../../../../../assets/liqpay-logo.jpg';
import FeedbackForm from "../../Feedback/FeedbackForm";
import FeedbackList from "../../Feedback/FeedbackList";
import { Button } from "../../../../Buttons/Buttons";

const Title = styled.h2`
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  margin-bottom: 10px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.extraLarge};
      }
`;

const SubTitle = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 30px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.extraLarge};
      }
`;

const ControllsButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  gap: 10px;
  @media (min-width: 767px) {
    justify-content: center;
  }
`;

const Image = styled.img`
  margin-bottom: 20px;
  width: 320px;
  @media (min-width: 767px) {
    margin-right: 30px;
    ${props => props.$payment ?  
      `margin: 0 auto;` : ""}
  }
`;

const MoreInfoControllsWrapper = styled.div`
  margin-bottom: 50px;
`;

const DeliveryWrapper = styled.div`
  @media (min-width: 767px) {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
`;

const PaymentWrapper = styled.div`
  text-align: center;
`;

const DeliveryInfoWrapper = styled.div`

`;

const FeedbackWrapper = styled.div`
display: flex;
flex-direction: column;
  @media (min-width: 767px) {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }
`;

const FeedbackItemWrapper = styled.div`
  flex: 0 0 50%;
`;

export default function MoreInfoControlls({ data }) {
  const { description, sizeInformation, category } = data;

  const [controllsButton, setControllsButton] = useState({
    moreInfo: true,
    delivery: false,
    payment: false,
    feedback: false
  });
  const { moreInfo, delivery, payment, feedback } = controllsButton;

  const handleClick = (e) => {
    const { id } = e.target;
    console.log(id);
    switch (id) {
      case id: {
        setControllsButton((prev) => {
          return {
            prev: false,
            [id]: !controllsButton[id],
          };
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <MoreInfoControllsWrapper>
      <ControllsButtonWrapper>
        <Button onClick={handleClick} id="moreInfo" $active={moreInfo}>
          Характеристики
        </Button>
        <Button onClick={handleClick} id="delivery" $active={delivery}>Доставка</Button>
        <Button onClick={handleClick} id="payment" $active={payment}>Оплата</Button>
        <Button onClick={handleClick} id="feedback" $active={feedback}>Відгуки</Button>
      </ControllsButtonWrapper>
      {moreInfo && (
        <>
          <Title>Категорія</Title>
          <SubTitle>{category}</SubTitle>
          <Title>Опис</Title>
          <SubTitle>{description}</SubTitle>
          <Title>Розмірна сітка</Title>
          <SubTitle>{sizeInformation}</SubTitle>
        </>
      )}
      {delivery && (
        <>
        <DeliveryWrapper>
        <Image alt="" src={novaLogo} />
        <DeliveryInfoWrapper>
        <SubTitle>При оформленні замовлення вкажіть “Доставка новою поштою”, вкажіть ваше місто та відділення і ми відправимо замовлення протягом 24 годин</SubTitle>
        <SubTitle>Вартість доставки – за тарифами Нової Пошти.</SubTitle>
        </DeliveryInfoWrapper>
        </DeliveryWrapper>
        <DeliveryWrapper>
        <Image alt="" src={afinaLogo} />
        <DeliveryInfoWrapper>
        <SubTitle>Самовивіз в Одесі </SubTitle>
        <SubTitle>ТЦ Афіна за адресою: Грецька площа 3/4</SubTitle>
        <SubTitle>Режим роботи, без вихідних з 12:00 до 20:00</SubTitle>
        </DeliveryInfoWrapper>
        </DeliveryWrapper>
        </>
      )}
      {payment &&
      <>
      <PaymentWrapper>
      <Title>Онлайн оплата за допомогою Liqpays</Title>
      <Image $payment src={liqpayLogo}/>
      <SubTitle>LiqPay – це платіжний сервіс, що надає можливості інтернет-еквайрингу - приймання платежів на сайтах, у мобільних додатках, підключених до Інтернету. Є одним за найпопулярніших сервісів оплати в Україні.</SubTitle>
      <SubTitle>Щоб скористатися онлайн оплатою з Liqpay, достатньо при оформленні товару вибрати тип оплати Liqpay, та обрати кращій для вас спосіб оплати.</SubTitle>
      <Title>Оплата при отриманні товару</Title>
      <SubTitle>При оформленні замовлення оберіть оплату накладеним платежом, та сплатіть замовлення при отриманні товару на новій пошті. </SubTitle>
      <Title>Мінімальна сума замовлення складає - 200грн.</Title>
      </PaymentWrapper>
      </>
      }
      {feedback && 
      <FeedbackWrapper>
        <FeedbackItemWrapper>
        <FeedbackForm />
        </FeedbackItemWrapper>
        <FeedbackItemWrapper>
        <FeedbackList />
        </FeedbackItemWrapper>
        </FeedbackWrapper>
      }
    </MoreInfoControllsWrapper>
  );
}
