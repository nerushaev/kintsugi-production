import { DeliveryWrapper, Image, SubTitle } from "./MoreInfoControlls";
import novaLogo from '../../../../../assets/nova-poshta-logo.jpg';
import afinaLogo from '../../../../../assets/afina-image.jpg';

export default function DeliveryInfo() {
  return (
    <>
    <DeliveryWrapper>
        <Image alt="" src={novaLogo} />
        <div>
        <SubTitle>При оформленні замовлення вкажіть “Доставка новою поштою”, вкажіть ваше місто та відділення і ми відправимо замовлення протягом 24 годин</SubTitle>
        <SubTitle>Вартість доставки – за тарифами Нової Пошти.</SubTitle>
        </div>
        </DeliveryWrapper>
        <div>
        <Image alt="" src={afinaLogo} />
        <div>
        <SubTitle>Самовивіз в Одесі </SubTitle>
        <SubTitle>ТЦ Афіна за адресою: Грецька площа 3/4</SubTitle>
        <SubTitle>Режим роботи, без вихідних з 12:00 до 20:00</SubTitle>
        </div>
        </div>
        </>
  )
}
