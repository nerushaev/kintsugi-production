import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css"
import "./Swiper.css";
import React from "react";

export default function Slider({ images }) {
  const elements = images.map((item) => {
    return (
      <SwiperSlide key={item}>
        <img src={item} alt="" />
      </SwiperSlide>
    );
  });
  return (
    <Swiper className="home-swiper" pagination={true} modules={[Pagination]}>
      {elements}
    </Swiper>
  );
}
