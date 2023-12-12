import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './swiper.css'

export default function App() {
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className='SwiperSlid'>
          <div className='swip-img1'></div>
          <div className='swip-img2'></div>
          <div className='swip-img3'></div>
          <div className='swip-img4'></div>
          <div className='swip-img5'></div>
          <div className='swip-img6'></div>
          <div className='swip-img7'></div>
          <div className='swip-img8'></div>
          <div className='swip-img9'></div>
          <div className='swip-img10'></div>
          <div className='swip-img11'></div>
          <div className='swip-img12'></div>
          <div className='swip-img13'></div>
          <div className='swip-img14'></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='swip-img1'></div>
          <div className='swip-img2'></div>
          <div className='swip-img3'></div>
          <div className='swip-img4'></div>
          <div className='swip-img5'></div>
          <div className='swip-img6'></div>
          <div className='swip-img7'></div>
          <div className='swip-img8'></div>
          <div className='swip-img9'></div>
          <div className='swip-img10'></div>
          <div className='swip-img11'></div>
          <div className='swip-img12'></div>
          <div className='swip-img13'></div>
          <div className='swip-img14'></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='swip-img1'></div>
          <div className='swip-img2'></div>
          <div className='swip-img3'></div>
          <div className='swip-img4'></div>
          <div className='swip-img5'></div>
          <div className='swip-img6'></div>
          <div className='swip-img7'></div>
          <div className='swip-img8'></div>
          <div className='swip-img9'></div>
          <div className='swip-img10'></div>
          <div className='swip-img11'></div>
          <div className='swip-img12'></div>
          <div className='swip-img13'></div>
          <div className='swip-img14'></div>
        </SwiperSlide>
      </Swiper>
      {/* <button>fefdg</button>
        <button>fdgfdg</button>
        <button>fdfg</button> */}
    </>
  );
}