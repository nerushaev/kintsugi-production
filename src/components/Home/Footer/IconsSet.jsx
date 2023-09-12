import React from "react";
import styled from "styled-components"
import instaLogoUrl from '../../../assets/instagram-icon.png';
import telegramLogoUrl from '../../../assets/telegram-icon.png';
import tiktokLogoUrl from '../../../assets/tiktok-icon.png';

const IconsList = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const IconsItem = styled.li`
&:not(:last-child) {
    margin-right: 20px;
  }
`;

const Container = styled.div`
  width: 40px;
  heith: 40px;
`;

export const IconsSet = () => {
  return (
    <IconsList>
      <IconsItem>
        <Container>
        <a target="_blanc" href="https://instagram.com/kintsugi_cosplay?igshid=YmMyMTA2M2Y="> 
        <img src={instaLogoUrl} alt="" />
        </a>
        </Container>
      </IconsItem>
      <IconsItem>
        <Container>
        <a target="_blanc" href="https://t.me/kintsugi_cosplay">
        <img src={telegramLogoUrl} alt="" />
        </a>
        </Container>
      </IconsItem>
      <IconsItem>
        <Container>
        <a target="_blanc" href="https://www.tiktok.com/@kintsugi_cosplay?_t=8XC3AdDiPjh&_r=1">
        <img src={tiktokLogoUrl} alt="" />
        </a>
        </Container>
      </IconsItem>
    </IconsList>
  )
}