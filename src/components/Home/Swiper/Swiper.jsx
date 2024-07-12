import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css"
import "./Swiper.css";
import React from "react";
import styled from 'styled-components';

const Image = styled.img`

`;


export default function Slider({ images }) {
  const elements = images.map((item) => {
    if (item && item[0] === "/") {
      item = `https://kintsugi.joinposter.com${item}`;
    }
    return (
      <SwiperSlide key={item}>
        <Image src={item ? item : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"} alt="" />
      </SwiperSlide>
    );
  });
  return (
    <Swiper className="details-swiper" pagination={true} modules={[Pagination]}>
      {elements}
    </Swiper>
  );
}
