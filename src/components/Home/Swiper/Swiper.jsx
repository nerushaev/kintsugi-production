import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/pagination";
import React from "react";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";

const Image = styled.div`
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 320px;
  min-width: 320px;
`;

export default function Slider({
  photos,
  setActiveSlideIndex,
  activeSlideIndex,
}) {

  const elements = photos.map((item) => {
    const swiperId = nanoid();

    if (item && item[0] === "/") {
      item = `https://kintsugi.joinposter.com${item}`;
    }
    return (
      <SwiperSlide key={swiperId}>
        <Image
          src={
            item
              ? item
              : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"
          }
          alt=""
        />
      </SwiperSlide>
    );
  });

  return (
    <>
      <Swiper

      key="swiper1"
        onSlideChange={(swiper) => {setActiveSlideIndex(swiper.activeIndex)}}
        initialSlide={activeSlideIndex}
        className="home-swiper"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {elements}
      </Swiper>
    </>
  );
}
