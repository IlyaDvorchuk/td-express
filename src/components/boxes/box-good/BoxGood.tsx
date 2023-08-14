import React, {useEffect, useMemo, useState} from 'react';
import './box-good.scss'
import '../../../styles/elements/buttons.scss'
import {Link, useNavigate} from "react-router-dom";
import {IProductCardRes, ITypeRes} from "../../../models/IProductCard";
import {API_URL} from "../../../http";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper";
import 'swiper/scss';
import "swiper/scss/navigation";
import {UserService} from "../../../services/UserService";
import CountGood from "../../countGood/CountGood";

const BoxGood = ({card} : {card: IProductCardRes}) => {
    const navigate = useNavigate()
    const additionalPhotos = useMemo(() => {
        const newPhotos = [...card.additionalPhotos];
        const middleIndex = Math.floor(newPhotos.length / 2);
        newPhotos.splice(middleIndex, 0, card.mainPhoto);
        return newPhotos;
    }, [card.additionalPhotos, card.mainPhoto]);

    const [mainPhoto, setMainPhoto] = useState(card.mainPhoto);
    const [count, setCount] = useState(1)
    const [activeSize, setActiveSize] = useState<ITypeRes | null>(card?.typeQuantity ? card?.typeQuantity[0] : null)
    const [quantity, setQuantity] = useState(card?.typeQuantity?.[0]?.quantity || card.pricesAndQuantity.quantity)
    const [isWindowWidth, setIsWindowWidth] = useState(() => {
        return window.innerWidth >= 450 ? 20 : 4;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsWindowWidth(window.innerWidth >= 450 ? 20 : 4);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    useEffect(() => {
        setMainPhoto(card?.mainPhoto);
    }, [card])
    const handleAdditionalPhotoClick = (photo: string) => {
        setMainPhoto(photo);
    };

    const onSetCount = (operator: '+' | '-') => {
        if (operator === '+') {
            if (count >= quantity) return
            setCount(count + 1)
        } else if (operator === '-') {
            if (count <= 1) return;
            setCount(count - 1)
        }
    }

    // const handleSlidePrev = () => {
    //     if (swiper) {
    //         swiper.slidePrev();
    //     }
    // };
    //
    // const handleSlideNext = () => {
    //     if (swiper) {
    //         swiper.slideNext();
    //     }
    // };

    const onSetSize = (size: ITypeRes) => {
        setActiveSize(size)
        setQuantity(size.quantity)
    }

    const onBack = () => {
        navigate(-1)
    }

    const addToCart = async () => {
        if (count > quantity) return
        const response = await UserService.addToCart({
            productId: card._id,
            quantity: count,
            // totalPrice: card.pricesAndQuantity.price ? card.pricesAndQuantity.price : card.pricesAndQuantity.priceBeforeDiscount,
            // isFavorite: false,
            size: activeSize?.size,
            typeId: activeSize?._id || ''
        })
        // if (response) setIsFavorite(true)
    }


    const onBuy = async () => {
        const response = await UserService.setBank()
        console.log('response', response)
    }

    return (
        <div className={'good'}>
            {card.categories.category?.name && <div className={'good__categories'}>
                <Link to={'/'}>Главная </Link>
                 / <Link to={`/category/${card.categories.category.id}`}>{card.categories.category.name} </Link>
                / <Link to={`/category/${card.categories.subcategory.id}`}>{card.categories.subcategory.name} </Link>
                {card.categories.section.name && <>
                    / <Link to={`/category/${card.categories.section.id}`}>{card.categories.section.name} </Link>
                </>}
            </div>}
            <div className={'good-wrapper'}>
                <div className={'good-photos'}>
                    <div className={'good-photos__aside'}>
                        <div className={'good-photos__back'} onClick={onBack}>
                            <img src="/images/svg/arrow-left-bold-little.svg" alt="Вернуться назад"/>
                        </div>
                        <div className={'good-additional-photos'}>
                            {/*<div className="custom-navigation fdfgdfg">*/}
                            {/*    <button className={'custom-navigation__up'} onClick={handleSlidePrev}>Previous</button>*/}
                            {/*    <button className={'custom-navigation__down'} onClick={handleSlideNext}>Next</button>*/}
                            {/*</div>*/}
                            <Swiper
                                direction={'vertical'}
                                slidesPerView={3}
                                spaceBetween={isWindowWidth}
                                modules={[Navigation]}
                                className={'good-additional-photos__slider'}
                            >
                                {additionalPhotos.map((photo, index) => (
                                    <SwiperSlide className={'good-additional-photos__slider-item'} key={index}>
                                        <div className={'good-additional-photos__item'} key={index}>
                                            <img
                                                src={`${API_URL}${photo}`}
                                                alt="Дополнительная фотография"
                                                onClick={() => handleAdditionalPhotoClick(photo)}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className={'main-photo'}>
                        <img src={`${API_URL}${mainPhoto}`} alt={card.information.name}/>
                    </div>
                </div>
                <div className={'good-information'}>
                    <h2 className={'good-information__title'}>
                        {card?.information?.name}
                    </h2>
                    {activeSize && card.typeQuantity && <div className={'good-information__sizes'}>
                        <p className={'good-information__subtitle'}>Размер:</p>
                        <div className={'sizes'}>
                            {card.typeQuantity.map((size, index) => (
                                <div
                                    className={`size-item ${size.size === activeSize.size && 'active'}`}
                                    key={index} onClick={() => onSetSize(size)}
                                >
                                    <span>
                                        {size.size}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className={'good-information__subtitle'}>Таблица размеров</p>
                    </div>}
                    <div className={'good-information__count'}>
                        Количество: {count}
                    </div>
                    <div className={'good-information__update-count'}>
                        <CountGood count={count} onSetCount={onSetCount}/>

                        <div className={'good-information__quantity'}>
                            В наличии: {quantity}
                        </div>
                    </div>
                    <div className={'good-information__prices'}>
                        <span className={'good-information__priceBeforeDiscount'}>
                            {card.pricesAndQuantity.price} RUP
                        </span>
                        { card.pricesAndQuantity.priceBeforeDiscount > 0 && <span className={'good-information__price'}>
                            {card.pricesAndQuantity.priceBeforeDiscount} RUP
                        </span>}
                    </div>
                    <div className={'good-information__buttons'}>
                        <button className={'button button_light'} onClick={addToCart}>
                            Добавить в корзину
                        </button>
                        <button className={'button button_dark'} onClick={onBuy}>
                            Купить сейчас
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxGood;
