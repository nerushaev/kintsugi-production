import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Slider from '../../Swiper/Swiper';
import { AddButton } from '../../../Buttons/Buttons';
import React, { useEffect, useRef } from 'react';
import { theme } from '../../../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToBusket } from '../../../../redux/products/products-slice';
import { getBusket } from '../../../../redux/products/products-selectors';
import CountButton from '../ProductsItem/CountButton';
import { Select } from '../ProductsItem/ProductsItem';
import { SlArrowLeftCircle } from "react-icons/sl";
import Score from '../Feedback/Score';
import { scroller } from 'react-scroll';

const ScoreWrapper = styled.div`
  margin-bottom: 20px;
`;

const GoBackLink = styled(NavLink)`
  margin-left: 10px;
  font-size: ${theme.fontSizes.small};
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.large};
      }
`;
const GoBackWrapper = styled.div`
  position: absolute;
  left: 30px;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const ProductName = styled.p`
  font-size: ${theme.fontSizes.small};
  margin-bottom: 20px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.large};
      }
`;

const ProductWrapper = styled.div`
position: relative;
  margin-bottom: 50px;
  @media (min-width: 767px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const DetailsCategory = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
  margin-bottom: 10px;
  @media (min-width: 767px) {
  font-size: ${theme.fontSizes.medium};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.extraLarge};
    }
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: 767px) {
    width: 350px;
    margin: 0;
  }
  @media (min-width: 1200px) {
    width: 500px;
    margin: 0;
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  @media (min-width: 767px) {
    width: 320px;
  }
`;

const DetailsText = styled.p`
  font-weight: 500;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 20px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
    }
  @media (min-width: 1199px) {
      font-size: ${theme.fontSizes.extraLarge};
      }
`;

const Price = styled.p`
  font-size: ${theme.fontSizes.large};
  margin-bottom: 30px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.extraLarge};
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export default function ProductsDetails({ data }) {
  const { name, image, description, price, size, _id, amount, category, score } = data;
  const sizes = size && size.join(", ");
  const sizeRef = useRef();
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  useEffect(() => {
    scroller.scrollTo('scroll', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }, [])

  const isFromBusket = busket.find((item) => item._id === _id);

  return (
    
    <>
      <ProductWrapper>
      <GoBackWrapper>
      <SlArrowLeftCircle size="32"/>
      <GoBackLink id="scroll" to="/">
          Назад
      </GoBackLink>
    </GoBackWrapper>
        <ImageWrapper>
        {image ? <Slider images={image} /> : ""}
      </ImageWrapper>
      <DetailsWrapper>
      <ProductName>{name}</ProductName>
      <ScoreWrapper>
      <Score score={score} />
      </ScoreWrapper>
      <DetailsCategory>Опис</DetailsCategory>
      <DetailsText>{description}</DetailsText>
      <DetailsCategory>Розміри</DetailsCategory>
      <DetailsText>{size === "-" ? "One size" : sizes}</DetailsText>
        <Price $accent>{price}грн.</Price>
        {isFromBusket ? 
        <ButtonWrapper>
      <AddButton>
        <CountButton quantity={isFromBusket.amount} _id={_id} />
      </AddButton>
        </ButtonWrapper>
        :
        <ButtonWrapper>
          {size[0] === "-" ? "" : 
          <Select onChange={e => sizeRef.current.value = e.target.value} ref={sizeRef}>
            {size.map(item => {
              return <option>{item}</option>
            })}
          </Select>
          }
          {
            size[0] === "-" ?
            <AddButton id={_id} onClick={() => {
              handleClick({
                _id,
                name,
                description,
                image,
                price,
                amount,
                category,
              })
            }
            }>
          Додати у кошик
        </AddButton>
        :
        <AddButton id={_id} onClick={() => {
          const {value} = sizeRef.current;
          handleClick({
            _id,
            name,
            description,
            image,
            price,
            amount,
            category,
            size: value
          })
        }
        }>
      Додати у кошик
    </AddButton>
          }
    </ButtonWrapper>
      }
      </DetailsWrapper>
      </ProductWrapper>
    </>
  )
};
