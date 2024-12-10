import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Navigation,Pagination ,Zoom} from "swiper/modules";
import "swiper/css";
import "./Swiper.css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import React, { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import useModal from "../../../hooks/modal";
import { IoMdClose } from "react-icons/io";
import Modal from "../../../components/Modal/Modal";
import { Block } from "../Products/ProductsDetails/ProductsDetails.styled";

const Image = styled.div`
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 100%;
  cursor: pointer;
`;
const CloseModal = styled.p`
  position: absolute;
  top:20px;
  right: 20px;
  z-index:1001;
`;

const Slider = memo(({
  photos,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [initialSlide, setInitialSlide] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleClickImage = (e) => {
    const {id} = e.target;
    if(id) {
      setInitialSlide(id);
      openModal()
    }
  }

  const elements = useMemo(() => photos.map((item, index) => {
    const swiperId = nanoid();

    if (item && item[0] === "/") {
      item = `https://kintsugi.joinposter.com${item}`;
    }
    return (
      <SwiperSlide key={swiperId}>
        <Image
          
          id={index}
          src={
            item
              ? item
              : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"
          }
          alt=""
        />
      </SwiperSlide>
    );
  }), [photos]);



  return (
    <>
        <>
        <Block style={{width: "100%"}}>
        <div onClick={(e) => handleClickImage(e)}>
          <Swiper
            // onClick={(swiper) => handleClickImage(swiper)}
            className="home-swiper"
            spaceBetween={10}
            navigation={true}
            thumbs={{swiper: thumbsSwiper}}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{marginBottom: "20px"}}
          >
            
            {elements}
          </Swiper>
          </div>
          </Block>
          <Block style={{width: "100%"}}>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            initialSlide={0}
          >
            {elements}
          </Swiper>
          </Block>
        </>
        <>
              {isModalOpen && (
                <Modal onCloseModal={closeModal}>
                {/*   <SwiperContainer> */}
                    <Swiper
                      key="swiper2"
                      pagination={true}
                      zoom={true}
                      navigation={true}
                      initialSlide={initialSlide}
                      modules={[Navigation, Zoom, Pagination]}
                      style={{
                        'width': '100%',
                        'height': '100%',
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                      }}
                    >
                    <CloseModal><IoMdClose onClick={closeModal} style={{fontSize: "36px", color: "white"}} /></CloseModal>
                      {photos.map((item) => {
                        const swiperId = nanoid();
                        if (item && item[0] === "/") {
                          item = `https://kintsugi.joinposter.com${item}`;
                        }
                        return (
                          <SwiperSlide
                            key={swiperId}
                            style={{overflow: "hidden"}}
                          >
                            <div className="swiper-zoom-container">
                            <img
                              src={
                                item
                                  ? item
                                  : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"
                              }
                              alt=""
                            />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                {/* </SwiperContainer> */}
                </Modal>
              )}
              </>
    </>
  );
});

export default Slider;