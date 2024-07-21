import { Container } from "../../../../Container/Container.styled";
import Subtitle from "../../../Subtitle/Subtitle";
import { Text } from "../../../../../pages/PublicOfferPage";

export default function DeliveryInfo() {
  return (
    <Container>
      <Subtitle accent center>
        Доставка
      </Subtitle>
      <Text>
        Доставка Новою Поштою або самовивіз у м. Одеса
      </Text>
      <Text $accent>
        Доставка Новою Поштою
      </Text>
      <Text>
        Оплата за доставку не входить в суму замовлення, та буде прорахована перевізником. 
      </Text>
      <Text>
        Доставка здійснюється 1-2 дні. 
      </Text>
      <Text $accent>
        Самовивіз у м. Одеса
      </Text>
      <Text>
        Ви можете самостійно забрати ваше замовлення у офлайн магазині "Кінтсугі" за адресою:
      </Text>
      <Text $accent>
        Грецька площа 3/4, ТЦ Афіна 4-й поверх 459 магазин
      </Text>
      <Text>
        Для цього при оформленні замовлення оберіть "самовивіз"
      </Text>
      </Container>
  )
}
