import React from "react";
import Subtitle from "../components/Home/Subtitle/Subtitle";
import Title from "../components/Home/Title/Title";
import styled from "styled-components";
import { theme } from "../styles/theme";

export const Text = styled.p`
  margin-bottom: 20px;
  font-size: ${(props) =>
    props.accent ? `${theme.fontSizes.large}` : `${theme.fontSizes.medium}`};
  font-weight: ${(props) => (props.accent ? "500" : "400")};
`;

export const Link = styled.a`
  margin: 0 5px;
  color: ${theme.colors.formButtonAccent};
`;

export default function PublicOfferPage() {
  return (
    <>
      <Title text={"Публічна оферта"} />
      <Subtitle $accent $center>
        ПУБЛІЧНИЙ ДОГОВІР КУПІВЛІ-ПРОДАЖУ ТОВАРУ
      </Subtitle>
      <Text>
        Договір купівлі-продажу товарів, адресований всім користувачам Сайту
        <Link href="https://kintsugi.org.ua">https://kintsugi.org.ua</Link>, та є договором публічної оферти.
      </Text>
      <Text>
        Власником сайту <Link>https://kintsugi.org.ua</Link> є фізична особа підприємець,
        адреса місцезнаходження: 6500, м. Одеса, Грецька 3/4. Прийняття умов
        цієї угоди передбачає укладення договору купівлі-продажу Товару між
        Продавцем та Користувачем, предмет і умови якого вказані у відповідному
        розділі сайту <Link>https://kintsugi.org.ua</Link> Користувач, діючи з метою
        придбання Товару, приймає умови цього договору (далі - Договір) про
        наступне:
      </Text>
      <Text $accent>1. Поняття та основні терміни</Text>
      <Text>
        1.1. Сайт - web-сайт, що належить Власнику сайту і має адресу в мережі
        Інтернет <Link>https://kintsugi.org.ua</Link>, за допомогою якого Користувач має
        можливість здійснити купівлю бажаного товару.
      </Text>
      <Text>
        1.2. Користувач (Ви) - фізична особа, резидент України, яка досягла 18 -
        річного віку, що володіє повною дієздатністю, що використовує даний сайт
        та/або його окремі інструменти, яка погодилася з умовами Публічної
        оферти і виконала всі її умови, описані нижче.
      </Text>
      <Text>
        1.3. Покупець - Користувач, який здійснив замовлення на сайті
        <Link>https://kintsugi.org.ua</Link>.
      </Text>
      <Text>
        1.4. Адміністрація сайту - адміністрація інтернет-магазину
        «Kintsugi»,<Link>https://kintsugi.org.ua</Link>.
      </Text>
      <Text>1.5. Договір - дана публічна оферта, включаючи всі її умови.</Text>
      <Text>
        1.6. Продавець - юридична особа або фізична особа-підприємець, яка
        розміщує на Сайті інформацію про товари та/або послуги, які можна
        замовити. Продавцем може бути як Адміністрація, так і будь-яка особа,
        якій Адміністрація надала право на розміщення відомостей про товари
        та/або послуги. Найменування Продавця вказується в документах на
        передачу товару Покупцеві (акт прийому-передачі, видаткова накладна,
        товарний чек, фіскальний чек і т.п., що підтверджують факт передачі
        товару Покупцеві).
      </Text>
      <Text>
        1.7. Товар - товари, послуги, інші матеріальні і нематеріальні об'єкти,
        інформація про які розміщена на Сайті.
      </Text>
      <Text>
        1.8. Замовлення - звернення Користувача через Сайт та/або за допомогою
        дзвінка на гарячу лінію до Продавця з проханням здійснити замовлення
        товару, а також сукупність товарів, зазначених у замовленні Користувача.
      </Text>
      <Text>
        1.9. Платник - особа, яка здійснює оплату замовлення Користувача.
      </Text>
      <Text>
        1.10. Одержувач - особа, зазначена Платником в формі замовлення в якості
        особи і уповноважена Платником отримати товар. Якщо інше не зазначено в
        формі Замовлення, Одержувачем є Платник.
      </Text>
      <Text>
        1.11. Пропозиція - відомості про товар, розміщені Продавцем на Сайті,
        які включають в себе інформацію про товар, його ціну, способи оплати та
        доставки, інформацію про знижки та акційні пропозиції на товар, а також
        інші умови замовлення товару. Умови Пропозицій, розміщених на Сайті,
        встановлюються Продавцем. Пропозиція є інформацією про можливі умови
        замовлення товару.
      </Text>
      <Text>1.12. Сторони - Продавець, Покупець, Користувач.</Text>
      <Text $accent>2. Предмет Договору та загальні положення</Text>
      <Text>
        2.1. Цей Договір регулює порядок доступу Користувача до інформації, що
        розміщується на Сайті, порядок використання Сайту, а також можливість
        передачі таких товарів Користувачеві.
      </Text>
      <Text>
        2.2. Цей Договір є публічною офертою. Використовуючи матеріали та
        інструменти Сайту, Користувач вважається таким що беззастережно і
        безумовно приймає (акцептує) цей Договір. Користувач зобов'язаний
        повністю ознайомитися з умовами цього Договору до реєстрації на Сайті і
        / або проставлення символу «галочка». Реєстрація Користувача на Сайті
        означає повне і беззастережне прийняття Договору (у відповідності зі
        статтями 641, 642 Цивільного Кодексу України).
      </Text>
      <Text>
        2.3. Сайт є платформою для розміщення пропозицій про продаж товарів
        Продавцями.
      </Text>
      <Text>
        2.4. Інформація про товар відображається на сайті
        <Link>https://kintsugi.org.ua</Link> і є динамічною. Це означає, що інформація може
        бути оновлена, змінена і доповнена Адміністрацією в будь-який момент
        часу без попереднього повідомлення Користувача. Будь-яка інформація про
        товар Продавця, умови акції, ціни товару, і будь-які інші правила
        надання послуг Продавцем відображаються на сайті <Link>https://kintsugi.org.ua</Link>
        Адміністрація Сайту має право в будь-який час в односторонньому порядку
        змінювати умови цього Договору. Зміни вступають в силу з моменту
        розміщення нової версії Договору на сайті <Link>https://kintsugi.org.ua</Link>
      </Text>
      <Text>
        2.5. Цей Дговір може бути укладений право- і дієздатним Користувачем,
        який досяг 14 років, з урахуванням особливостей, передбачених главою 4
        Цивільного Кодексу України. Приймаючи умови договору, Ви підтверджуєте
        свою право- і дієздатність, приймаєте на себе зобов'язання, що виникають
        в результаті використання сайту <Link>https://kintsugi.org.ua</Link> і укладення
        даного договору.
      </Text>
      <Text>
        2.5. Цей Дговір може бути укладений право- і дієздатним Користувачем,
        який досяг 14 років, з урахуванням особливостей, передбачених главою 4
        Цивільного Кодексу України. Приймаючи умови договору, Ви підтверджуєте
        свою право- і дієздатність, приймаєте на себе зобов'язання, що виникають
        в результаті використання сайту <Link>https://kintsugi.org.ua</Link> і укладення
        даного договору.
      </Text>
      <Text>
        2.6. Пропозиція на Сайті не є офертою. Користувач після ознайомлення з
        розміщеним на сайті Пропозицією має право зробити оферту Продавцю шляхом
        заповнення форми Замовлення та/або здійснити замовлення через відправку
        повідомлення за допомогою Сайту або здійснення дзвінка на номер, що
        вказаний безпосередньо на Сайті. Заповнення форми Замовлення вважається
        офертою Користувача Продавцю на замовлення Користувачем товару на
        умовах, зазначених у відповідному Пропозицію.
      </Text>
      <Text>
        2.7. Оферта вважається прийнятою Продавцем, якщо Продавець здійснив дії,
        які свідчать про прийняття оферти Користувача, а саме: фактично
        відвантажив товар, приступив до надання послуг відповідно до умов,
        передбачених офертою Користувача, надав рахунок на оплату замовлених
        товарів.
      </Text>
      <Text>
        2.8. Продавець має право запропонувати замовити товар на інших умовах
        після отримання оферти від Користувача. В такому випадку ця пропозиція
        вважається зустрічній офертою і має бути прийнята Користувачем.
        Прийняттям зустрічній оферти вважається фактичне отримання Користувачем
        та/або Одержувачем товару на умовах, передбачених зустрічній офертою.
        Продавець має право відкликати зустрічну оферту до моменту отримання
        товару Покупцем.
      </Text>
      <Text>
        2.9. Узгодженням всіх істотних умов Сторонами є оплата та/або фактичне
        отримання товару Покупцем, а також відвантаження товару Продавцем.
      </Text>
      <Text>
        2.10. Сторони погоджуються, що напрямок Продавцем і / або Адміністрацією
        сайту будь-яких повідомлень про наявність товару, прийняття замовлення,
        терміни доставки товару, його ціну, умови і формах оплати, статус та /
        або зміни статусу замовлення і т.п., відправлених Продавцем і / або
        адміністрацією сайту за допомогою електронної пошти, sms- повідомлень,
        за допомогою телефонії, є виключно повідомленням Покупця про отримання
        оферти Продавцем і не може свідчити про її акцептування Продавцем.
      </Text>
      <Text>2.11. Доставка товару здійснюється:</Text>
      <Text>
        - компанією-експедитором ТОВ «Нова Пошта» шляхом адресної доставки
        Користувачеві або доставки до відділення «Нової Пошти» з подальшим
        самостійним отриманням товару Користувачем;
      </Text>
      <Text>
        - самостійним вивезенням товару клієнтом з роздрібного магазину «Kintsugi».
      </Text>
      <Text>
        Якщо в населеному пункті не представлено відділення компанії-експедитора
        або роздрібного магазину Продавця, Користувач має право вибрати для
        доставки найближчий населених пункт, в якому представлено відділення
        компанії-експедитора або Продавця. Адреси відділень компанії-експедитора
        можна побачити за посиланням novaposhta.ua.
      </Text>
      <Text>
        Продавець не здійснює доставку на окуповані території України (АРК,
        території Луганської та Донецької областей), а також інші населені
        пункти, які не забезпечені відділеннями компанією-експедитором.
        Користувачі погоджуються з тим, що вартість товарів/послуг Продавця,
        розміщених на сайті, може збільшуватися без попереднього повідомлення.
      </Text>
      <Text>
        2.12. Моментом отримання товару Одержувачем є підписання Одержувачем
        документа, що підтверджує факт прийняття замовленого Користувачем товару
        (товарно-транспортна накладна, акт прийому-передачі, декларація на
        пересилку, товарно-транспортна накладна і т.д.) або фактичне отримання
        Одержувачем Товару і вчинення ним дій, що свідчать про прийняття товару.
        Перед відправкою товар перевіряється і страхується на повну вартість.
        При отриманні товару Одержувач зобов'язується перевірити товар на
        наявність пошкоджень, а також наявність комплекту необхідних документів
        (товарний чек, гарантійний талон, акт прийому-передачі) і, в разі
        проблем, на місці пред'явити претензії службі доставки. Продавець не
        несе відповідальність за дії компанії перевізника.
      </Text>
      <Text>
        2.13. При прийнятті (акцептування) оферти Продавця Користувач надає
        згоду про отримання інформації про товар за допомогою дистанційного
        зв'язку. Проставлена підпис на документах, що підтверджують прийняття
        товару та/або фактичне прийняття товару, означає, що Одержувач отримав
        всі необхідні відомості (інформацію) про товар до моменту його
        прийняття.
      </Text>
      <Text $accent>3. Ціна і порядок оплати</Text>
      <Text>
        3.1. Ціна кожного окремого Товару визначається Продавцем і вказується на
        Сайті. Ціна Замовлення визначається шляхом додавання ціни всіх включених
        в Замовлення Товарів і ціни доставки, яка дорівнює сумі підлягає до
        сплати, що вказується на Сайті при оформленні Замовлення в момент його
        розміщення.
      </Text>
      <Text>
        3.2. Ціна договору дорівнює ціні Замовлення. Сума замовлення може
        змінюватися в залежності від ціни, кількості або номенклатури Товару.
      </Text>
      <Text>
        3.3. Покупець здійснює оплату Товару згідно Замовлення. Покупець
        самостійно вибирає один з таких способів оплати:
      </Text>
      <Text>
        3.4. Оплата Товарів здійснюється в національній валюті України. Доступні
        Покупцям способи оплати Товарів залежать від технічних можливостей і
        комерційних домовленостей Продавця з фінансовими партнерами. Доступні
        способи і особливості здійснення оплати обраних Покупцем Товарів
        вказуються на сторінці оформлення Замовлення на Сайті або повідомляються
        іншим чином в залежності від обраного способу оформлення Замовлення.
      </Text>
      <Text>
        3.5. Замовлення вважається оплаченим з моменту надходження оплати на
        розрахунковий рахунок Продавця або його представника. Факт оплати
        Замовлення свідчить про згоду Покупця з умовами Договору.
      </Text>
      <Text>
        3.6. Доставка Замовлення Продавцем виконується після повної оплати
        Товару. 
      </Text>
      <Text>
      3.7. Ціна Товару, що вказана на Сайті, може бути змінена
        Продавцем в односторонньому порядку. При цьому ціна на замовлений
        Покупцем Товар зміні не підлягає. 
      </Text>
      <Text>
      3.8. До моменту зарахування коштів
        Покупця на розрахунковий рахунок Продавця товар не резервується.
        Продавець не може гарантувати доступність Товару Продавця в кількості,
        зазначеній в момент оформлення Замовлення, в результаті чого, можуть
        збільшитися терміни обробки Замовлення. У разі необхідності здійснення
        повернення коштів Продавцем Покупцеві для здійснення повернення коштів
        Покупець зобов'язаний повідомити Продавцеві реквізити банківського
        рахунку, на який Продавець зобов'язаний перерахувати грошові кошти.
      </Text>
      <Text $accent>4. Відповідальність сторін</Text>
      <Text>
        4.1. Будучи Користувачем Сайту, Ви гарантуєте не здійснювати будь-які
        дії, що порушують законодавство України, норми міжнародного права та
        дії, які можуть порушити нормальне функціонування Сайту.
      </Text>
      <Text>
        4.2. Користувач зобов'язаний своєчасно проінформувати Адміністрацію
        Сайту про несанкціонований доступ до особистої сторінки Користувача
        третіми особами. Для інформування користувач повинен звернутися в Службу
        підтримки за кординатами, вказаними на Сайті.
      </Text>
      <Text>
        4.3. Користувач надає свою згоду на використання і обробку персональних
        даних Користувача відповідно до чинного законодавства України.
      </Text>
      <Text>
        4.4. Приймаючи умови Договору користувача, Користувач також підтверджує,
        що ознайомлений і згоден із розділом Політика конфіденційності Сайту, а
        також з умовами цього Договору.
      </Text>
      <Text>
        4.5. Приймаючи умови Договору користувача, Користувач підтверджує, що
        він є право- і дієздатним, а також, що у нього відсутні будь-які
        обмеження в дієздатності.
      </Text>
      <Text>
        4.6. Коментарі та інші записи Користувача на Сайті не повинні суперечити
        вимогам законодавства України та загальноприйнятих норм моралі та
        моральності.
      </Text>
      <Text>
        4.7. Відповідальність за грошові перекази, які здійснюють Платники,
        повністю лежить на банках і платіжних системах, послугами яких вирішує
        скористатися Користувач. Продавець не бере на себе відповідальність за
        дії процесингового центру.
      </Text>
      <Text>
        4.8. Власник сайту не несе відповідальність за працездатність
        обладнання, на якому розміщений сайт, доступність Сайту, роботу каналів
        передачі даних та інші технічні засоби для здійснення Користувачами
        доступу до Сайту.
      </Text>
      <Text>
        4.9. Продавець не несе відповідальність за дії Перевізника, в тому числі
        за терміни перевезення компанією перевізником, а також за збереження
        доставки.
      </Text>
      <Text>
        4.10. Відповідальність Продавця за зміни умов замовлення товару
        обмежується правом Одержувача (Користувача, Платника) відмовитися від
        замовлення товару і вимагати повернення сплачених за нього коштів (якщо
        вони оплачені).
      </Text>
      <Text>
        4.11. Користувач несе відповідальність за достовірність даних,
        зазначених у формі Замовлення. У разі, якщо некоректне, неточне та/або
        неправильне зазначення даних в замовленні призвело до додаткових витрат
        Продавця, пов'язаних з доставкою товару по невірному адресою або видачі
        товару невірного Одержувачу, все пов'язані з цим збитки та витрати
        покладаються на Користувача. Продавець має право утримувати суму таких
        збитків або витрат з сум, сплачених Платником в якості оплати товару.
        Користувач зобов'язаний надати про себе всю необхідну інформацію для
        здійснення електронної угоди.
      </Text>
      <Text $accent>5. Інші умови</Text>
      <Text>
        5.1. Користувач має право призначити Одержувачем замовленого товару
        третю особу. В цьому випадку Одержувач зобов'язаний вказати в формі
        Замовлення дані, необхідні для ідентифікації отримувача і доставки йому
        товару. На відносини сторін, в такому випадку, поширюються положення ст.
        636 Цивільного Кодексу України.
      </Text>
      <Text>
        5.2. Всі можливі суперечки і протиріччя, що виникають між Сторонами в
        рамках цього Договору, підлягають вирішенню відповідно до чинного
        законодавства України виключно за місцем реєстрації Власника сайту.
        Визнання судом будь-якого положення цього Договору недійсним не скасовує
        дію Договору в решті частини і не знімає з Користувача Сайту
        зобов'язань, прийнятих при реєстрації.
      </Text>
      <Text>
        5.3. Всі права на Сайт в цілому і на використання мережевої адреси
        (доменного імені)<Link>https://kintsugi.org.ua</Link> належать Власнику сайту.
      </Text>
      <Text>
        5.4. Користувач погоджується з тим, що після проходження процедури
        реєстрації на Сайті, Адміністрація сайту та/або Продавець буде
        направляти на електронну адресу користувачів листи та/або повідомлення,
        в тому числі, рекламного характеру. Разом з цим, Сайт зобов'язується не
        передавати електронну адресу, а також будь-які інші відомості про
        Користувачів третім особам. Користувач має право відмовитися від такої
        розсилки самостійно.
      </Text>
      <Text>
        5.5. Вказуючи номер мобільного телефону в формах на сайті, Користувач
        автоматично погоджується отримувати повідомлення від Сайту, в тому числі
        рекламного характеру. При виникненні наміру зупинити таку розсилку,
        Користувач повинен звернутися в технічну підтримку сайту.
      </Text>
      <Text>
        5.6. Користувачеві забороняється розміщувати призначений для користувача
        контент, заборонений чинним законодавством та / або такий, що суперечить
        морально-етичним нормам спільноти.
      </Text>
      <Text>
        5.7. Здійснюючи Замовлення на Сайті, Користувач добровільно надає свою
        згоду Адміністрації сайту на збір і обробку (накопичення, зберігання,
        адаптування, відновлення, використання, поширення, знищення) зазначених
        ним даних, а саме: прізвище, ім'я, по батькові, електронна пошта,
        телефон, адреса, з метою забезпечення відносин в сфері купівлі-продажу,
        відносин у сфері захисту прав споживачів, у сфері рекламних і
        маркетингових досліджень, а також дає свою згоду на передачу (поширення)
        його даних перевізникам, транспортно-експедиторських і кур'єрським
        організаціям, іншим третім особам ( без обмеження) на розсуд
        Адміністрації сайту. Дане положення діє протягом 5 років з моменту
        оформлення останнього замовлення на сайті.
      </Text>
      <Text>5.8. Користувач ознайомлений і згоден з умовами даної угоди.</Text>
    </>
  );
};