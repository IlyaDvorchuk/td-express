import React from 'react';
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import { Navigation, Pagination } from "swiper";
import 'swiper/scss';
import "swiper/css/navigation";
import "swiper/css/pagination";
import './slider.scss'


const Slider = () => {
    const swiper = useSwiper();

    return (
        <div className={'slider'}>
            <Swiper
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                }}
                pagination={{
                    dynamicBullets: true
                }}
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                loop={true}
                grabCursor={true}
            >
                <SwiperSlide className={'slider__item'}>Slide 1</SwiperSlide>
                <SwiperSlide className={'slider__item'}>Slide 2</SwiperSlide>
                <SwiperSlide className={'slider__item'}>Slide 3</SwiperSlide>
                <SwiperSlide className={'slider__item'}>Slide 4</SwiperSlide>
                <SwiperSlide className={'slider__item'}>Slide 5</SwiperSlide>
            </Swiper>
            <button className={'slider-button swiper-button-prev'}  onClick={() => swiper.slidePrev()}>
                <img src={'/images/svg/arrow-left.svg'} alt={'arrow right'}/>
            </button>
            <button className={'slider-button swiper-button-next'}  onClick={() => swiper.slideNext()}>
                <img src={'/images/svg/arrow-right-little.svg'} alt={'arrow right'}/>
            </button>

        </div>
    );
};

export default Slider;
