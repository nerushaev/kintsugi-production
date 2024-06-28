import styled from 'styled-components';
import { Image, SubTitle, Title } from './MoreInfoControlls';
import liqpayLogo from '../../../../../assets/liqpay-logo.jpg';

const PaymentWrapper = styled.div`
  text-align: center;
`;

export default function PaymentInfo() {
  return (
      <PaymentWrapper>
      <Title>Онлайн оплата за допомогою Liqpays</Title>
      <Image $payment src={liqpayLogo}/>
      <SubTitle>LiqPay – це платіжний сервіс, що надає можливості інтернет-еквайрингу - приймання платежів на сайтах, у мобільних додатках, підключених до Інтернету. Є одним за найпопулярніших сервісів оплати в Україні.</SubTitle>
      <SubTitle>Щоб скористатися онлайн оплатою з Liqpay, достатньо при оформленні товару вибрати тип оплати Liqpay, та обрати кращій для вас спосіб оплати.</SubTitle>
      <Title>Оплата при отриманні товару</Title>
      <SubTitle>При оформленні замовлення оберіть оплату накладеним платежом, та сплатіть замовлення при отриманні товару на новій пошті. </SubTitle>
      <Title>Мінімальна сума замовлення складає - 200грн.</Title>
      </PaymentWrapper>
  )
}
