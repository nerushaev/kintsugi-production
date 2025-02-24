import styled from "styled-components";
import { Container } from "../components/Container/Container.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOrderAccepted,
  selectOrderId,
} from "../redux/products/products-selectors";
import useModal from "../hooks/modal";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";
import { clearOrderInfo } from "../redux/products/products-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PopularProductSlider from "../components/Home/PopularProductSlider/PopularProductSlider";
import { useNavigate } from "react-router-dom";
import { Title, TitleWrapper } from "../components/Text/Text.styled";
import useScreenSize from "../hooks/useScreenSize";

const StyledImg = styled.img`
  cursor: pointer;
`;

const HeroWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const OrderNotificationWrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
`;

const CategoryButtonsWrapper = styled.div`
  box-sizing: border-box;
  ${(props) => {
    if(props.$tablet && !props.$isDesktop) {
      return `
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
      `
    } else if(props.$isDesktop) {
      return `
      display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 10px;`
    } else {
      return `
      display: grid;
        grid-template-columns: 1fr 1fr ;
        gap: 10px;
      `
    }
  }}
`;

const CategoryButton = styled.button`
  width: 100%;
  font-size: 20px;
  font-weight: 1000;
  color: white;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 6px;
  aspect-ratio: 1 / 1;

  &:not(:last-child) {
    margin-bottom: ${props => props.$tablet ? "0" : "20px"};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 1;
  }

  & > span {
  padding: 2px;
  border-radius: 6px;
  background-color: gray;
    position: relative;
    z-index: 2;
  }

  &:hover {
  scale: 102%;
  }
`;

const categoriesImages = {
  "Косплей": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730197840/cosplay-category_k05wyy.jpg",
  "Перуки": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730202809/wigs-category_gu5okw.jpg",
  "Lolita fashion": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730202595/merch-category_fxq2yn.jpg",
  "Рюкзаки, сумки": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730202413/bags-category_lmk0ym.jpg",
  "Катани, мечі, зброя": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730198166/katanas-category_rfb6pl.jpg",
  "Мерч": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730202999/merch-category_1_vuvsul.jpg",
  "Фігурки": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730203565/figures-category_ljmhit.jpg",
  "K-pop": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730203208/k-pop-category_brodnn.jpg",
  "Аксесуари": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730203343/accessories-category_oxcuwe.jpg",
  "Акрилові стенди": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730203737/stands-category_xwnumc.jpg",
  "Лінзи": "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730203868/lense-category_cahrsp.jpg"
}

const categories = {
  "cosplay": "Косплей",
  "wigs": "Перуки",
  "accessories": "Аксесуари",
  "merch": "Мерч",
  "lolita-fashion": "Lolita fashion",
  "katanas-swords-weapons": "Катани, мечі, зброя",
  "k-pop": "K-pop",
  "figures": "Фігурки",
  "acrylic-stands": "Акрилові стенди",
  "backpacks-bags": "Рюкзаки, сумки",
  "lenses": "Лінзи"
};


export default function Home() {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const isTablet = screenSize.width >= 768;
  const isDesktop = screenSize.width >= 1199;

  console.log(isTablet)
  const {
    openModal: openOrderModal,
    isModalOpen: isOrderModalOpen,
    closeModal,
  } = useModal();

  const dispatch = useDispatch();
  const orderAccepted = useSelector(selectIsOrderAccepted);
  const orderId = useSelector(selectOrderId);

  useEffect(() => {
    if (orderAccepted && orderId) {
      openOrderModal();
    }
  }, [orderAccepted, openOrderModal, orderId]);

  const handleClick = () => {
    dispatch(clearOrderInfo());
  };

  const mainPageSlider = {
      imageLow: "https://res.cloudinary.com/dzjmswzgp/image/upload/v1731083008/Group_60-min_pzwqoq.jpg",
      imageHigh: "https://res.cloudinary.com/dzjmswzgp/image/upload/v1731940401/home_banner_high_q_xxj1zd.jpg"
  }

  // const secondPageSlider = useMemo(() => [
  //   {
  //     image: "https://res.cloudinary.com/dzjmswzgp/image/upload/v1730199433/secondPageBanner_1_mps9ed.jpg"
  //   }
  // ], []);

  const handleClickCategory = (category) => {
    Object.entries(categories).filter(item => {
      if(item[1] === category) {
        return navigate(`/${item[0]}`);
      }
      return item;
    });
  }
  
  return (
    <>
    
      <HeroWrapper>
        <Swiper
        navigation={true}
        className="home-swiper"
        modules={[Navigation]}
        >
          {!isTablet && <>
            <SwiperSlide key={mainPageSlider.imageLow}>
                  <StyledImg
                    src={mainPageSlider.imageLow}
                    alt=""
                  />
                </SwiperSlide>
          </>}

          {isTablet && <>
            <SwiperSlide key={mainPageSlider.imageHigh}>
                  <StyledImg
                    src={mainPageSlider.imageHigh}
                    alt=""
                  />
                </SwiperSlide>
          </>}
            
        </Swiper>
      </HeroWrapper>
      <Container>
        <TitleWrapper>
        <Title>Товари по категоріям</Title>
        </TitleWrapper>
        <CategoryButtonsWrapper $tablet={isTablet} $isDesktop={isDesktop} style={{marginBottom: "30px"}}>
  {Object.entries(categoriesImages).map(([categoryName, imageUrl]) => (
    <CategoryButton 
    onClick={() => handleClickCategory(categoryName)}
      key={categoryName}
      style={{ backgroundImage: `url(${imageUrl})` }}
      $tablet={isTablet}
    >
      <span>{categoryName}</span>
    </CategoryButton>
  ))}
</CategoryButtonsWrapper>
</Container>

<Container>
<PopularProductSlider />
</Container>
      <>
        {isOrderModalOpen && orderAccepted && (
          <Modal onCloseModal={closeModal}>
            <OrderNotificationWrapper>
              <h2>Ваше замовлення під номером {orderId} прийнято!</h2>
              <p>В найближчій час с вами зв'яжуться для підтвердження!</p>
              <ButtonWrapper>
                <Button onClick={handleClick}>Закрити</Button>
              </ButtonWrapper>
            </OrderNotificationWrapper>
          </Modal>
        )}
      </>
    </>
  );
}
