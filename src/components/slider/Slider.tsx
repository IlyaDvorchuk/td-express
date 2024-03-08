import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/scss';
import "swiper/css/navigation";
import "swiper/css/pagination";
import './slider.scss'
import {Link} from "react-router-dom";


const Slider = () => {
    const swiperRef = useRef() as any;



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
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 9000
                }}
            >
                <SwiperSlide className={'slider__item'}>
                    <img src="/images/slider/slider-main.png" alt=""/>
                </SwiperSlide>
                <SwiperSlide className={'slider__item'}>
                    <Link to={'seller/FIT%20KIT'}>
                        <img src="/images/slider/shop-sport.png" alt=""/>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={'slider__item'}>
                    <Link to={'seller/maicom'}>
                        <img src="/images/slider/slider-maicom.png" alt=""/>
                    </Link>
                </SwiperSlide>
            </Swiper>
            <button className={'slider-button swiper-button-prev'} onClick={() => swiperRef.current.slidePrev()}>
                <img src={'/images/svg/arrow-left.svg'} alt={'arrow right'}/>
            </button>
            <button className={'slider-button swiper-button-next'} onClick={() => swiperRef.current.slideNext()}>
                <img src={'/images/svg/arrow-right-little.svg'} alt={'arrow right'}/>
            </button>

        </div>
    );
};

export default Slider;
